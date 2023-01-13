package hyns.dev.bblogbacksecond.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import hyns.dev.bblogbacksecond.Entity.Article;

public interface ArticleRepository extends JpaRepository<Article, Long>{
    
}
