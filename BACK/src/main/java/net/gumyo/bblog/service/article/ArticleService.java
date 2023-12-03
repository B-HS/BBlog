package net.gumyo.bblog.service.article;

import java.util.List;

import net.gumyo.bblog.entity.Article;

public interface ArticleService {
    List<Article> getFullArticleList();

    Article getArticleById(Long aid);
}
