package dev.hyns.bblogback.Controller;

import java.util.HashMap;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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


@Controller
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
        return new ResponseEntity<Boolean>(aser.addReply(dto), HttpStatus.OK);
    }

    @RequestMapping(value = "/reply/delete",  method = RequestMethod.POST, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> deleteReply(@RequestBody ReplyDTO dto){
        return new ResponseEntity<Boolean>(aser.deleteReply(dto), HttpStatus.OK);
    }


    

    @RequestMapping(value = "/admin/images/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> imageUpload(MultipartRequest request) throws Exception {
        return new ResponseEntity<>(aser.ImgUpload(request), HttpStatus.OK);
    }

    @RequestMapping(value = "/admin/write", method = RequestMethod.POST, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Long> read(@RequestBody ArticleDTO dto) {
        return new ResponseEntity<>(aser.write(dto), HttpStatus.OK);
    }

}
