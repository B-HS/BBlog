package dev.hyns.bblogback.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.hyns.bblogback.Entity.ArticleImage;

public interface ArticleImageRepository extends JpaRepository<ArticleImage, Long>{
    
}
