package net.gumyo.bblog.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.gumyo.bblog.entity.Article;
import net.gumyo.bblog.service.article.ArticleService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

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

    @GetMapping("/article/list/{mename}/{page}/{count}")
    public Page<Article> getMenuListByMenuName(
            @PathVariable("mename") String mename,
            @PathVariable("page") Long page,
            @PathVariable("count") Long count) {
        return aser.getArticleListByMenuName(Arrays.asList(mename.split(",")), page, count);
    }

    @PostMapping("/article/save")
    public Long saveArticle(@RequestBody Article article) {
        return aser.saveArticle(article);
    }

}
