package net.gumyo.bblog.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.gumyo.bblog.entity.Article;
import net.gumyo.bblog.service.article.ArticleService;

@RestController
@RequiredArgsConstructor
public class ArticleController {
    private final ArticleService aser;

    @GetMapping(value = "/article/list")
    public List<Article> getMenuList() {
        return aser.getFullArticleList();
    }

    @GetMapping(value = "/article/{aid}")
    public Article getArticle(@PathVariable("aid") Long aid) {
        return aser.getArticleById(aid);
    }
}
