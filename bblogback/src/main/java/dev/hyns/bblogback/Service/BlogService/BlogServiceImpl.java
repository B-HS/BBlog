package dev.hyns.bblogback.Service.BlogService;

import java.util.HashMap;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import dev.hyns.bblogback.DTO.MenuDTO;
import dev.hyns.bblogback.Repository.MenuRepository;
import dev.hyns.bblogback.Repository.ArticleRepository.getArticleCard;
import dev.hyns.bblogback.VO.ArticleCardInfo;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BlogServiceImpl implements BlogService {
    private final MenuRepository mrepo;

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
