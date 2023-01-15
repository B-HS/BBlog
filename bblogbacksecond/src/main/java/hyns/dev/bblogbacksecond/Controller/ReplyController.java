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
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping("reply")
@RequiredArgsConstructor
public class ReplyController {
    private final ReplyService rser;

    @GetMapping(value = "{aid}/{page}/{size}")
    public ResponseEntity<HashMap<String, Object>> getArticleList(
            @PathVariable("aid") Long menu,
            @PathVariable(value= "page") Integer page,
            @PathVariable(value="size") Integer size) {
        return new ResponseEntity<>(rser.list(menu, page, size), HttpStatus.OK);
    }


    @PostMapping(value = "write/guest")
    public ResponseEntity<Long> writeReplyGuest(@RequestBody ReplyDTO dto){
        log.info(dto);
        return new ResponseEntity<>(rser.wrtie(dto), HttpStatus.OK);
    }

    // @PreAuthorize
    @PostMapping(value = "write/user")
    public ResponseEntity<Long> writeReply(@RequestBody ReplyDTO dto){
        return new ResponseEntity<>(rser.wrtie(dto), HttpStatus.OK);
    }
}
