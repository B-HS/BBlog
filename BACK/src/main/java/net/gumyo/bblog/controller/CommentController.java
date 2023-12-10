package net.gumyo.bblog.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.gumyo.bblog.entity.Comment;
import net.gumyo.bblog.service.comment.CommentService;

@RestController
@RequiredArgsConstructor
public class CommentController {
    private final CommentService cser;

    @PostMapping("/comment/save")
    public Long saveComment(@RequestBody Map<String, Object> comment) {
        return cser.saveComment(comment);
    }

    @PostMapping("/comment/modify")
    public Long modifyComment(@RequestBody Map<String, Object> comment) {
        return cser.modifyComment(comment);
    }

    @PostMapping("/comment/remove")
    public Long removeComment(@RequestBody Map<String, Object> comment) {
        return cser.removeComment(comment);
    }

    @GetMapping("/comment/list/{aid}")
    public List<Comment> getCommentsByAid(@PathVariable("aid") Long aid) {
        return cser.getCommentListByAid(aid);
    }

}
