package dev.hyns.bblogbackend.Article;

import java.util.HashMap;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;
@RestController
@RequestMapping(value = "article")
@RequiredArgsConstructor
public class ArticleController {
    private final ArticleService aser;
    @PostMapping("/read") ResponseEntity<ArticleDTO> read(@RequestBody ArticleDTO dto) {System.out.println(dto);return aser.readArticle(dto.getAid());}
    @PostMapping("/write") ResponseEntity<Long> write(@RequestBody ArticleDTO dto) {return aser.writeArticle(dto);}
    @PostMapping("/modify") ResponseEntity<Long> modify(@RequestBody ArticleDTO dto) {return aser.modifyArticle(dto);}
    @PostMapping("/delete") ResponseEntity<Boolean> delete(@RequestBody ArticleDTO dto) {return aser.deleteArticle(dto.getAid());}
    @PostMapping("/list") ResponseEntity<HashMap<String, Object>> list(@RequestBody ArticleDTO dto) {return aser.articleList(dto.getMenu(), dto.getPage(), dto.getSize());}
    @PostMapping("/check") ResponseEntity<Boolean> token(@RequestBody ArticleDTO dto) {return new ResponseEntity<>(true, HttpStatus.OK);}
}
