package hyns.dev.bblogbacksecond.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import hyns.dev.bblogbacksecond.Entity.ArticleHashtag;

public interface ArticleHashtagRepository extends JpaRepository<ArticleHashtag, Long>{
    
    void deleteAllByHashtagTagNameIn(List<String> tagname);
}
