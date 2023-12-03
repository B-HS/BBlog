package net.gumyo.bblog.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import net.gumyo.bblog.entity.Article;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findAllByHideFalse();

    Article findByAidAndHideFalse(Long aid);
}
