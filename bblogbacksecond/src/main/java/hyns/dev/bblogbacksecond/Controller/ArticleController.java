package hyns.dev.bblogbacksecond.Controller;

import java.util.HashMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hyns.dev.bblogbacksecond.DTO.ArticleDTO;
import hyns.dev.bblogbacksecond.Entity.Article.Menu;
import hyns.dev.bblogbacksecond.Service.ArticleService.ArticleService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("article")
@RequiredArgsConstructor
public class ArticleController {
    private final ArticleService aser;

    @GetMapping(value = "{menu}/{page}/{size}")
    public ResponseEntity<HashMap<String, Object>> getArticleList(
            @PathVariable("menu") Menu menu,
            @PathVariable(value= "page") Integer page,
            @PathVariable(value="size") Integer size) {
        return new ResponseEntity<>(aser.list(menu, page, size), HttpStatus.OK);
    }

    @GetMapping(value = "{num}")
    public ResponseEntity<ArticleDTO> getArticleDetail(@PathVariable("num") Long aid) {
        return new ResponseEntity<>(aser.read(aid), HttpStatus.OK);
    }

    @PostMapping(value = "write")
    public ResponseEntity<Long> writeArticle(@RequestBody ArticleDTO dto){
        return new ResponseEntity<>(aser.wrtie(dto), HttpStatus.OK);
    }

    @PostMapping(value = "modify")
    public ResponseEntity<Long> modifyArticle(@RequestBody ArticleDTO dto){
        return new ResponseEntity<>(aser.modify(dto), HttpStatus.OK);
    }

    @DeleteMapping(value = "{num}")
    public ResponseEntity<Boolean> deleteArticle(@PathVariable("num") Long aid){
        return new ResponseEntity<>(aser.delete(aid), HttpStatus.OK);
    }
}
