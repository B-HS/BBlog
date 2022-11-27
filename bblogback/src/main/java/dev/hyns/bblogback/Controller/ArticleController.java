package dev.hyns.bblogback.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartRequest;

import dev.hyns.bblogback.DTO.ArticleDTO;
import dev.hyns.bblogback.DTO.ReplyDTO;
import dev.hyns.bblogback.Service.ArticleService.ArticleService;
import dev.hyns.bblogback.VO.ArticleCardInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
@Log4j2
@RestController
@RequestMapping(value = "/article")
@RequiredArgsConstructor
public class ArticleController {
    private final ArticleService aser;

    
    @RequestMapping(value = "/{aid}", method = RequestMethod.GET, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ArticleDTO> read(@ModelAttribute("aid") Long aid) {
        return new ResponseEntity<>(aser.read(aid), HttpStatus.OK);
    }

    @RequestMapping(value = "/images/{name}", method = RequestMethod.GET, consumes = MediaType.ALL_VALUE)
    public ResponseEntity<byte[]> imageRead(@ModelAttribute("name") String name) {
        byte[] file = (byte[]) aser.ImgRead(name).get(0);
        HttpHeaders header = new HttpHeaders();
        header.add("Content-Type", aser.ImgRead(name).get(1).toString());
        return new ResponseEntity<>(file, header, HttpStatus.OK);
    }

    @RequestMapping(value = "/recent", method= RequestMethod.POST, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HashMap<String, Object>> recentArticleList(@RequestBody ArticleCardInfo cardInfo){
        Pageable pageabe = PageRequest.of(cardInfo.getRequestedPage(), cardInfo.getTotalPageSize(),Sort.by(Sort.Direction.DESC, "aid"));
        return new ResponseEntity<HashMap<String,Object>>(aser.recentArticleList(pageabe), HttpStatus.OK);
    }

    @RequestMapping(value = "/reply",  method = RequestMethod.POST, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> addReply(@RequestBody ReplyDTO dto){
        return new ResponseEntity<Boolean>(aser.addReplyForGeust(dto), HttpStatus.OK);
    }
    @RequestMapping(value = "/reply",  method = RequestMethod.PATCH, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> updateReply(@RequestBody ReplyDTO dto){
        return new ResponseEntity<Boolean>(aser.updateReplyForGuest(dto), HttpStatus.OK);
    }
    @RequestMapping(value = "/reply/delete",  method = RequestMethod.POST, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> deleteReply(@RequestBody ReplyDTO dto){
        return new ResponseEntity<Boolean>(aser.deleteReplyForGuest(dto), HttpStatus.OK);
    }


    // For member, admin
    @RequestMapping(value = "/member/reply",  method = RequestMethod.POST, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> addReplyForMember(@RequestBody ReplyDTO dto){
        log.info(dto);
        return new ResponseEntity<Boolean>(aser.addReply(dto), HttpStatus.OK);
    }
    @RequestMapping(value = "/member/reply/modify",  method = RequestMethod.POST, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> updateReplyForMember(@RequestBody ReplyDTO dto){
        return new ResponseEntity<Boolean>(aser.updateReply(dto), HttpStatus.OK);
    }

    @RequestMapping(value = "/member/reply/delete",  method = RequestMethod.POST, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> deleteReplyForMember(@RequestBody ReplyDTO dto){
        return new ResponseEntity<Boolean>(aser.deleteReply(dto), HttpStatus.OK);
    }

    @RequestMapping(value = "/admin/images/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> imageUpload(MultipartRequest request) throws Exception {
        return new ResponseEntity<>(aser.ImgUpload(request), HttpStatus.OK);
    }

    @RequestMapping(value = "/admin/write", method = RequestMethod.POST, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Long> write(@RequestBody ArticleDTO dto) {
        return new ResponseEntity<>(aser.write(dto), HttpStatus.OK);
    }

    @RequestMapping(value = "/replylist", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ReplyDTO>> replyList(@RequestBody Map<String, Long> mid) {
        log.info(mid);
        log.info(mid.get("mid"));
        return new ResponseEntity<>(aser.replyListByMid(mid.get("mid")), HttpStatus.OK);
    }

}
