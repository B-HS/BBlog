package net.gumyo.bblog.service.article;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import net.gumyo.bblog.entity.Article;
import net.gumyo.bblog.repository.ArticleRepository;

@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {
    private final ArticleRepository arepo;

    @Override
    public List<Article> getFullArticleList() {
        return arepo.findAllByHideFalse();
    }

    @Override
    public Article getArticleById(Long aid) {
        return arepo.findByAidAndHideFalse(aid);
    }
}
