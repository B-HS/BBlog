package dev.hyns.bblogbackend.Article.Comment;
import java.util.HashMap;
import org.springframework.http.ResponseEntity;
import dev.hyns.bblogbackend.Article.Article;
public interface CommentService {
    ResponseEntity<Long> commentWrite(CommentDTO dto);
    ResponseEntity<Long> commentModify(CommentDTO dto);
    ResponseEntity<Boolean> commentDelete(CommentDTO dto);
    ResponseEntity<HashMap<String, Object>> commentList(Integer page, Integer size, long aid);
    default Comment toEntity(CommentDTO dto) {return Comment.builder().article(Article.builder().aid(dto.getAid()).build()).rid(dto.getRid()).commentDesc(dto.getCommentDesc()).nickname(dto.getNickname()).pw(dto.getPw()).commentGroup(dto.getCommentGroup()).commentSort(dto.getCommentSort()).commentImg(dto.getCommentImg()).uploadedDated(dto.getUploadedDated()).build();}
    default CommentDTO toDTO(Comment entity) {return CommentDTO.builder().aid(entity.getArticle().getAid()).rid(entity.getRid()).commentDesc(entity.getCommentDesc()).commentDesc(entity.getCommentDesc()).nickname(entity.getNickname()) .pw(entity.getPw()) .commentGroup(entity.getCommentGroup()) .commentSort(entity.getCommentSort()).commentImg(entity.getCommentImg()).uploadedDated(entity.getUploadedDated()).build();}
}
