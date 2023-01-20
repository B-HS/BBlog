package hyns.dev.bblogbacksecond.Repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.EntityGraph.EntityGraphType;

import hyns.dev.bblogbacksecond.Entity.Article;
import hyns.dev.bblogbacksecond.Entity.Article.Menu;

public interface ArticleRepository extends JpaRepository<Article, Long>{
    Page<Article> findDistinctAllByMenu(Pageable pageable, Menu menu);

    @Query( value = """
        SELECT DISTINCT att 
        from Article att 
            LEFT JOIN ArticleHashtag aht on att.aid = aht.article.aid
                LEFT JOIN Hashtag htt on aht.hashtag.hid = htt.hid
        WHERE att.title like %:keywords% or att.context like %:keywords% or htt.tagName like %:keywords%
        """)
    Page<Article> searchList(Pageable pageable, String keywords);

    @EntityGraph(attributePaths = {"artiHash", "artiHash.hashtag", "visitors", "imgs"}, type = EntityGraphType.LOAD)
    Article findByAid(Long aid);

    Optional<Article> findFirstByMenuOrderByAidDesc(Menu menu);
}
