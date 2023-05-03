package dev.hyns.bblogbackend.Article.Comment;
import java.util.HashMap;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "comment")
public class CommentController {
    private final CommentService cser;
    @PostMapping("/write") ResponseEntity<Long> write(@RequestBody CommentDTO dto) {return cser.commentWrite(dto);}
    @PostMapping("/modify") ResponseEntity<Long> modify(@RequestBody CommentDTO dto) {return cser.commentModify(dto);}
    @PostMapping("/delete") ResponseEntity<Boolean> delete(@RequestBody CommentDTO dto) {return cser.commentDelete(dto);}
    @PostMapping("/list") ResponseEntity<HashMap<String, Object>> list(@RequestBody CommentDTO dto) { return cser.commentList(dto.getPage(), dto.getSize(), dto.getAid());}
}
