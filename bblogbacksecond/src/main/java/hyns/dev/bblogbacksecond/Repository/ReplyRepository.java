package hyns.dev.bblogbacksecond.Repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import hyns.dev.bblogbacksecond.Entity.Reply;

public interface ReplyRepository extends JpaRepository<Reply, Long>{
    @EntityGraph(attributePaths = {"member", "article"})
    Page<Reply>findDistinctAllByArticleAid(Pageable pageable, Long aid);

    @EntityGraph(attributePaths = {"member", "article"})
    Optional<Reply> findFirstByArticleAidOrderByRidDesc(Long aid);

    @EntityGraph(attributePaths = {"member", "article"})
    Optional<Reply> findByRidAndMemberMid(Long id, Long mid);
}
