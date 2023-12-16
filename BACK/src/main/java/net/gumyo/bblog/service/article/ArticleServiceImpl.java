package net.gumyo.bblog.service.article;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import net.gumyo.bblog.entity.Article;
import net.gumyo.bblog.entity.Menu;
import net.gumyo.bblog.repository.ArticleRepository;
import net.gumyo.bblog.repository.MenuRepository;

@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {
    private final ArticleRepository arepo;
    private final MenuRepository mrepo;

    @Override
    public List<Article> getFullArticleList() {
        return arepo.findAllByHideFalse();
    }

    @Override
    public Page<Article> getArticleListByMenuName(List<String> mename, Long page, Long count) {
        List<Long> targetMenu = mrepo.findAllByMenameIn(mename).stream().map(Menu::getMekey).toList();
        PageRequest pageable = PageRequest.of(page.intValue() - 1, count.intValue(), Sort.Direction.DESC, "aid");
        return targetMenu != null ? arepo.findAllByMekeyInAndHideFalse(targetMenu, pageable) : null;
    }

    @Override
    public Article getArticleById(Long aid) {
        return arepo.findByAidAndHideFalse(aid);
    }

    @Override
    public Long saveArticle(Article article) {
        return arepo.save(article).getAid();
    }

    @Override
    public List<Article> getArticleListByTitleAndContext(String param) {
        String keyword = "%" + param + "%";
        return arepo.findAllByTitleLikeOrContextLikeAndHideFalse(keyword, keyword);
    }
}
