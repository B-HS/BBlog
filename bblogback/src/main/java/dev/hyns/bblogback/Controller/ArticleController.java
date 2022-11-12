package dev.hyns.bblogback.Controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

// import lombok.extern.log4j.Log4j2;

@Controller
@RestController
@RequestMapping(value = "/article")
// @Log4j2
public class ArticleController {
    
    @RequestMapping(value = "/{aid}", method = RequestMethod.GET, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> read(@ModelAttribute("aid") Long aid){
        return new ResponseEntity<>("all", HttpStatus.OK);
    }


}
