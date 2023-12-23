package net.gumyo.bblog.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import net.gumyo.bblog.entity.Article;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findAllByHideFalse();

    Page<Article> findAllByMekeyInAndHideFalse(List<Long> mekey, Pageable pageable);

    Article findByAidAndHideFalse(Long aid);

    List<Article> findAllByTitleLikeOrContextLikeAndHideFalse(String title, String context);

    @Query(value = "SELECT article.* FROM article WHERE article.mekey = (SELECT mekey FROM menu WHERE mename = :menuname LIMIT 1)", nativeQuery = true)
    Article getArticleByMenuName(@Param("menuname") String menuname);
}
