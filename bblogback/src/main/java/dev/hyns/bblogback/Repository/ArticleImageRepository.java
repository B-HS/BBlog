package dev.hyns.bblogback.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.hyns.bblogback.Entity.ArticleImage;

@Repository
public interface ArticleImageRepository extends JpaRepository<ArticleImage, Long>{
    
}
