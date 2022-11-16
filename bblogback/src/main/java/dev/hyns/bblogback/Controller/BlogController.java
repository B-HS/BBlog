package dev.hyns.bblogback.Controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import dev.hyns.bblogback.DTO.MenuDTO;
import dev.hyns.bblogback.Service.BlogService.BlogService;
import dev.hyns.bblogback.VO.ArticleCardInfo;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class BlogController {
    private final BlogService bser;

    @RequestMapping(value = "/menulist", method = RequestMethod.GET, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<MenuDTO>> menuList(){
        return new ResponseEntity<>(bser.getMenuList(), HttpStatus.OK);
    }

    @RequestMapping(value = "/category/{menu}", method= RequestMethod.POST, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HashMap<String, Object>> articlesSortedByMenu(@RequestBody ArticleCardInfo cardInfo, @ModelAttribute("menu") Long menu){
        Pageable pageabe = PageRequest.of(cardInfo.getRequestedPage(), cardInfo.getTotalPageSize());
        return new ResponseEntity<HashMap<String,Object>>(bser.getArticleListByMenuId(pageabe, menu), HttpStatus.OK);
    }
}
