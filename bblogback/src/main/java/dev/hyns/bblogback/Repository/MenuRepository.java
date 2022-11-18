package dev.hyns.bblogback.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import dev.hyns.bblogback.Entity.Menu;
import dev.hyns.bblogback.Repository.ArticleRepository.getArticleCard;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long>{

    @Query("SELECT att.aid as aid, att.title as title, att.context as context, att.regDate as regdate, count(rp.rid) as replyCount, ai.fileName as imgFileName " +
    "FROM Article att left join Reply rp on rp.article=att.aid left join ArticleImage ai on att.aid = ai.article left join Menu mn on att.menu = mn.lid "+
    "WHERE mn.lid =:lid group by att.aid, rp.article, ai.imgid, mn.lid")
    Page<getArticleCard> getArticleListByMenuId(Pageable pageable, Long lid);
}
