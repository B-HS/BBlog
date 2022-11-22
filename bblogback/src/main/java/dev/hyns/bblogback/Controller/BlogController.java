package dev.hyns.bblogback.Controller;

import java.util.HashMap;
import java.util.List;


import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import dev.hyns.bblogback.DTO.MembersDTO;
import dev.hyns.bblogback.DTO.MenuDTO;
import dev.hyns.bblogback.DTO.StacksDTO;
import dev.hyns.bblogback.DTO.VisitorDTO;
import dev.hyns.bblogback.Service.BlogService.BlogService;
import dev.hyns.bblogback.Service.MembersService.MembersService;
import dev.hyns.bblogback.VO.ArticleCardInfo;
import dev.hyns.bblogback.VO.StackInfoVO;
import dev.hyns.bblogback.VO.TodayAndTotal;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class BlogController {
    private final BlogService bser;
    private final MembersService mser;

    @RequestMapping(value = "/menulist", method = RequestMethod.GET, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<MenuDTO>> menuList(){
        return new ResponseEntity<>(bser.getMenuList(), HttpStatus.OK);
    }

    @RequestMapping(value = "/category/{menu}", method= RequestMethod.POST, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HashMap<String, Object>> articlesSortedByMenu(@RequestBody ArticleCardInfo cardInfo, @ModelAttribute("menu") Long menu){
        Pageable pageabe = PageRequest.of(cardInfo.getRequestedPage(), cardInfo.getTotalPageSize(),Sort.by(Sort.Direction.DESC, "aid"));
        return new ResponseEntity<HashMap<String,Object>>(bser.getArticleListByMenuId(pageabe, menu), HttpStatus.OK);
    }

    @RequestMapping(value = "/visitor/count", method= RequestMethod.POST, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TodayAndTotal> getVisitorInformation(){
        return new ResponseEntity<>(bser.getToday(),HttpStatus.OK);
    }

    @RequestMapping(value = "/visitor", method= RequestMethod.POST, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getVisitorInformation(@RequestBody VisitorDTO visitor){
        bser.VisitorCheck(visitor);
        return new ResponseEntity<>("null",HttpStatus.OK);
    }

    @RequestMapping(value = "/stack", method= RequestMethod.GET, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<StacksDTO>> getStackInformation(){
        return new ResponseEntity<>(bser.getStackList(),HttpStatus.OK);
    }
    
    @RequestMapping(value = "/register", method = RequestMethod.POST, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> memberRegister(@RequestBody MembersDTO dto){
        return new ResponseEntity<>(mser.register(dto), HttpStatus.OK);
    }
    
    @RequestMapping(value = "/admin/stack", method= RequestMethod.POST, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> ModifyingStackInformation(@RequestBody StackInfoVO stack){
        return new ResponseEntity<>(bser.StackSave(stack),HttpStatus.OK);
    }
}
