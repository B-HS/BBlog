package dev.hyns.bblogback.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import dev.hyns.bblogback.Entity.Article;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long>{
    @Query("SELECT at FROM Article at left join Visitor vt on vt.article=at.aid left join Reply rp on rp.article=at.aid left join Hashtag ht on ht.article=at.aid WHERE aid=:aid")
    Optional<Article> findByIdEager(Long aid);

    @Query(value=
    "SELECT att.aid as aid, att.title as title, att.context as context, att.regDate as regdate, count(rp.rid) as replyCount, ai.fileName as imgFileName " +
    "FROM Article att left join Reply rp on rp.article=att.aid left join ArticleImage ai on att.aid = ai.article "+
    "WHERE att.hide=0 and ai.idx=0 group by att.aid, rp.rid, ai.imgid "
    )
    Page<getArticleCard> RecentArticleList(Pageable pageable);
    
    public interface getArticleCard{
        Long getAid();
        String getTitle();
        byte[] getContext();
        LocalDateTime getRegdate();
        Integer getReplyCount();
        String getImgFileName();
    }
}
