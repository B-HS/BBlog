package net.gumyo.bblog.service.article;

import java.util.List;

import org.springframework.data.domain.Page;

import net.gumyo.bblog.entity.Article;

public interface ArticleService {
    List<Article> getFullArticleList();

    Page<Article> getArticleListByMenuName(List<String> mename, Long page, Long count);

    Article getArticleById(Long aid);
}
