package dev.hyns.bblogback.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import dev.hyns.bblogback.Entity.Article;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long>{
    @Query("SELECT at FROM Article at left join Visitor vt on vt.article=at.aid left join Reply rp on rp.article=at.aid left join Hashtag ht on ht.article=at.aid WHERE aid=:aid")
    Optional<Article> findByIdEager(Long aid);
}
