package dev.hyns.bblogback.Service.BlogService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import dev.hyns.bblogback.DTO.MenuDTO;
import dev.hyns.bblogback.DTO.StacksDTO;
import dev.hyns.bblogback.DTO.VisitorDTO;
import dev.hyns.bblogback.Entity.Article;
import dev.hyns.bblogback.Entity.Stacks;
import dev.hyns.bblogback.Entity.Visitor;
import dev.hyns.bblogback.Repository.MenuRepository;
import dev.hyns.bblogback.Repository.StacksRepository;
import dev.hyns.bblogback.Repository.VisitorRepository;
import dev.hyns.bblogback.Repository.ArticleRepository.getArticleCard;
import dev.hyns.bblogback.VO.ArticleCardInfo;
import dev.hyns.bblogback.VO.StackInfoVO;
import dev.hyns.bblogback.VO.TodayAndTotal;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BlogServiceImpl implements BlogService {
    private final MenuRepository mrepo;
    private final StacksRepository srepo;
    private final VisitorRepository vrepo;


    @Override
    public boolean StackSave(StackInfoVO vo) {
        for (int i = 0; i < vo.getDtoList().size(); i++) {
            StacksDTO dto =  vo.getDtoList().get(i);
            if (vo.getDeleteList().contains(dto.getSid())) {
                srepo.deleteById(dto.getSid());
            }else{
                dto.setIdx(i);
                srepo.save(Stacks.builder().sid(dto.getSid()).idx(i).title(dto.getTitle()).context(dto.getContext().getBytes()).build());
            }
        }
        return true;
    }

    @Override
    public List<StacksDTO> getStackList() {
        List<StacksDTO> dtos = srepo.findAllByOrderByIdxAsc().stream().map(v->{
            return StacksDTO
            .builder()
            .sid(v.getSid())
            .idx(v.getIdx())
            .title(v.getTitle())
            .context(v.updateContextToString(v.getContext()))
            .build();
            }).toList();
        return dtos;
    }

    @Override
    public TodayAndTotal getToday() {
        LocalDateTime today = LocalDate.now().atStartOfDay();
        return TodayAndTotal.builder()
                .today(vrepo.findAllByRegDateGreaterThanEqualAndInitTrue(today).size())
                .total(vrepo.findAllByInitTrue().size())
                .build();
    }

    @Override
    public void VisitorCheck(VisitorDTO dto) {
        if (dto.isInit()) {
            Visitor entity = Visitor.builder()
                    .init(dto.isInit())
                    .prevLink(dto.getPrevLink())
                    .build();
            vrepo.save(entity);
        } else {
            Visitor entity = Visitor.builder()
                    .article(Article.builder().aid(dto.getArticleid()).build())
                    .init(dto.isInit())
                    .prevLink(dto.getPrevLink())
                    .build();
            vrepo.save(entity);
        }
    }

    @Override
    public List<MenuDTO> getMenuList() {
        return mrepo.findAll().stream().map(v -> menuEntityToDTO(v)).toList();
    }

    @Override
    public HashMap<String, Object> getArticleListByMenuId(Pageable pageable, Long lid) {
        HashMap<String, Object> result = new HashMap<>();
        Page<getArticleCard> paging = mrepo.getArticleListByMenuId(pageable, lid);
        // 인터페이스 그냥 넣고싶은데 연습용으로 VO하나 만들어서 넣어봄
        result.put("dtoList", paging.stream().map(v -> new ArticleCardInfo(v)).toList());
        result.put("currentPage", paging.getNumber());
        result.put("totalPage", paging.getTotalPages());
        return result;
    }
}
