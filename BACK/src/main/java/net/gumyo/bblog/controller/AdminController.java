package net.gumyo.bblog.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.gumyo.bblog.entity.Comment;
import net.gumyo.bblog.entity.SystemLog;
import net.gumyo.bblog.repository.SystemLogRepository;
import net.gumyo.bblog.service.comment.CommentService;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {
    private final CommentService cser;
    private final SystemLogRepository slrepo;

    @PostMapping("/comment/list")
    public List<Comment> getAllComment() {
        return cser.getAllComments();
    }

    @PostMapping("/comment/delete")
    public Long removeComment(@RequestBody Map<String, Object> entity) {
        return cser.removeCommentByAdmin(entity);
    }

    @PostMapping("/log/list")
    public List<SystemLog> postMethodName() {
        return slrepo.findAll();
    }

}
