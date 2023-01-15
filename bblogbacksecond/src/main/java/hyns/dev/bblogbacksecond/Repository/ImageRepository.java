package hyns.dev.bblogbacksecond.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import hyns.dev.bblogbacksecond.Entity.ArticleImage;

public interface ImageRepository extends JpaRepository<ArticleImage, Long>{
    
}
