package hyns.dev.bblogbacksecond.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.EntityGraph.EntityGraphType;

import hyns.dev.bblogbacksecond.Entity.Article;
import hyns.dev.bblogbacksecond.Entity.Article.Menu;

public interface ArticleRepository extends JpaRepository<Article, Long>{
    Page<Article> findDistinctAllByMenu(Pageable pageable, Menu menu);

    @EntityGraph(attributePaths = {"artiHash", "artiHash.hashtag", "visitors"}, type = EntityGraphType.LOAD)
    Article findByAid(Long aid);
}
