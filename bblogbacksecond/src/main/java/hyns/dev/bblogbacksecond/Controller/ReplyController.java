package hyns.dev.bblogbacksecond.Controller;

import java.util.HashMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hyns.dev.bblogbacksecond.DTO.ReplyDTO;
import hyns.dev.bblogbacksecond.Service.ReplyService.ReplyService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("reply")
@RequiredArgsConstructor
public class ReplyController {
    private final ReplyService rser;

    @GetMapping("{aid}/{page}/{size}")
    public ResponseEntity<HashMap<String, Object>> getArticleList(
            @PathVariable("aid") Long menu,
            @PathVariable("page") Integer page,
            @PathVariable("size") Integer size) {
        return new ResponseEntity<>(rser.list(menu, page, size), HttpStatus.OK);
    }

    @PostMapping("write/{which}")
    public ResponseEntity<Long> writeReply(@RequestBody ReplyDTO dto, @PathVariable("which") String which) {
        return new ResponseEntity<>(rser.wrtie(dto, which.equals("user") ? true : false), HttpStatus.OK);
    }

    @PostMapping("modify/{which}")
    public ResponseEntity<Long> modifyReply(@RequestBody ReplyDTO dto, @PathVariable("which") String which) {
        return new ResponseEntity<>(rser.modify(dto, which.equals("user") ? true : false), HttpStatus.OK);
    }

    @PostMapping("delete/{which}")
    public ResponseEntity<Long> deleteReply(@RequestBody ReplyDTO dto, @PathVariable("which") String which) {
        return new ResponseEntity<>(rser.delete(dto, which.equals("user") ? true : false), HttpStatus.OK);
    }
}
