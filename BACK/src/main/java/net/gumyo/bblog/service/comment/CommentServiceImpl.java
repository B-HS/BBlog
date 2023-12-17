package net.gumyo.bblog.service.comment;

import java.util.List;
import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import net.gumyo.bblog.entity.Comment;
import net.gumyo.bblog.repository.CommentRepository;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final CommentRepository crepo;
    private final PasswordEncoder pEncoder;

    @Override
    public List<Comment> getAllComments() {
        return crepo.findAll();
    }

    @Override
    public Long saveComment(Map<String, Object> comment) {
        Object uppercid = comment.get("uppercid");

        return crepo.save(Comment.builder()
                .aid(Long.parseLong(comment.get("aid").toString()))
                .nickname((String) comment.get("nickname"))
                .img((String) comment.get("img"))
                .context((String) comment.get("context"))
                .uppercid(uppercid != null ? Long.parseLong(uppercid.toString()) : 0)
                .password(pEncoder.encode(comment.get("password").toString()))
                .insertdate((String) comment.get("insertdate"))
                .deleted(false)
                .build()).getCid();
    }

    @Override
    public Long modifyComment(Map<String, Object> comment) {
        Long[] result = { Long.parseLong(comment.get("cid").toString()) };
        crepo.findById(result[0]).ifPresent(c -> {
            if (pEncoder.matches(comment.get("password").toString(), c.getPassword())) {
                c.updateComment(comment.get("context").toString());
                crepo.save(c);
            } else {
                result[0] = -1L;
            }
        });
        return result[0];
    }

    @Override
    public Long removeComment(Map<String, Object> comment) {
        Long[] result = { Long.parseLong(comment.get("cid").toString()) };
        crepo.findById(result[0]).ifPresent(c -> {
            if (pEncoder.matches(comment.get("password").toString(), c.getPassword())) {
                c.deleteComment();
                crepo.save(c);
            } else {
                result[0] = -1L;
            }
        });
        return result[0];
    }

    @Override
    public List<Comment> getCommentListByAid(Long aid) {
        return crepo.findAllByAid(aid).stream().map(ele -> {
            if (ele.getDeleted() != null && ele.getDeleted() == true) {
                ele.deleteContext();
            }
            return ele;
        }).toList();
    }

    @Override
    public Long removeCommentByAdmin(Map<String, Object> comment) {
        crepo.findById(Long.parseLong(comment.get("cid").toString())).ifPresent(c -> {
            c.deleteComment();
            crepo.save(c);
        });
        return 1L;
    }
}
