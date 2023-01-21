package hyns.dev.bblogbacksecond.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import hyns.dev.bblogbacksecond.Entity.ArticleImage;

public interface ImageRepository extends JpaRepository<ArticleImage, Long>{
    void deleteAllByNameIn(List<String> imgName);
}
