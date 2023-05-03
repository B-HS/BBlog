package dev.hyns.bblogbackend.Article.Comment;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
public interface CommentRepository extends JpaRepository<Comment, Long> {
    Page<Comment>findDistinctAllByArticleAidOrderByCommentGroupAscCommentSortAscRidAsc(Pageable pageable, Long aid);
    @Query(value = "SELECT rid FROM Comment ct ORDER BY rid DESC LIMIT 1")
    Optional<Long>lastCmtNum();
}
