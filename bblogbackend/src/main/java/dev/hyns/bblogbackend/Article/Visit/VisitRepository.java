package dev.hyns.bblogbackend.Article.Visit;
import org.springframework.data.jpa.repository.JpaRepository;
public interface VisitRepository extends JpaRepository<Visit, Long>{Long countByArticleAid(Long aid);}
