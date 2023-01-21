package hyns.dev.bblogbacksecond.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import hyns.dev.bblogbacksecond.Entity.Hashtag;

public interface HashtagRepository extends JpaRepository<Hashtag, Long>{
    Optional<List<Hashtag>> findAllByTagNameIn(List<String> tags);
    Optional<Hashtag> findByTagName(String tags);
}
