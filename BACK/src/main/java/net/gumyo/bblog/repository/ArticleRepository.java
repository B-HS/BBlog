package net.gumyo.bblog.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import net.gumyo.bblog.entity.Article;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findAllByHideFalse();

    Page<Article> findAllByMekeyInAndHideFalse(List<Long> mekey, Pageable pageable);

    Article findByAidAndHideFalse(Long aid);

    List<Article> findAllByTitleLikeOrContextLikeAndHideFalse(String title, String context);

}
