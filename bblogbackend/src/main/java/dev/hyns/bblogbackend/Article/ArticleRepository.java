package dev.hyns.bblogbackend.Article;

import java.util.Optional;
import java.util.Set;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import dev.hyns.bblogbackend.Article.Article.Menu;

public interface ArticleRepository extends  JpaRepository<Article, Long>{
    Page<Article> findAllByMenuNotIn(Pageable pageable, Set<Menu> menus);
    Page<Article> findDistinctAllByMenu(Pageable pageable, Menu menu);
    Optional<Article> findOneByMenuEqualsOrderByAidDesc(Menu menu);
}
