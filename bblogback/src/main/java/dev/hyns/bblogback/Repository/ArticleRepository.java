package dev.hyns.bblogback.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.hyns.bblogback.Entity.Article;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long>{
    
}
