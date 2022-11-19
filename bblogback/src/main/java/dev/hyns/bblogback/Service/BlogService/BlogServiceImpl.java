package dev.hyns.bblogback.Service.BlogService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import dev.hyns.bblogback.DTO.MenuDTO;
import dev.hyns.bblogback.DTO.VisitorDTO;
import dev.hyns.bblogback.Entity.Article;
import dev.hyns.bblogback.Entity.Visitor;
import dev.hyns.bblogback.Repository.MenuRepository;
import dev.hyns.bblogback.Repository.VisitorRepository;
import dev.hyns.bblogback.Repository.ArticleRepository.getArticleCard;
import dev.hyns.bblogback.VO.ArticleCardInfo;
import dev.hyns.bblogback.VO.TodayAndTotal;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@RequiredArgsConstructor
@Log4j2
public class BlogServiceImpl implements BlogService {
    private final MenuRepository mrepo;
    private final VisitorRepository vrepo;

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
        log.info(dto);
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
