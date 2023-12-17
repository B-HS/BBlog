package net.gumyo.bblog.service.comment;

import java.util.List;
import java.util.Map;

import net.gumyo.bblog.entity.Comment;

public interface CommentService {
    List<Comment> getAllComments();

    Long saveComment(Map<String, Object> comment);

    Long modifyComment(Map<String, Object> comment);

    Long removeComment(Map<String, Object> comment);

    Long removeCommentByAdmin(Map<String, Object> comment);

    List<Comment> getCommentListByAid(Long aid);

}
