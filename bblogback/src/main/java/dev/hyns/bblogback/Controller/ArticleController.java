package dev.hyns.bblogback.Controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import dev.hyns.bblogback.DTO.ArticleDTO;
import dev.hyns.bblogback.Service.ArticleService.ArticleService;
import lombok.RequiredArgsConstructor;

import lombok.extern.log4j.Log4j2;

@Controller
@RestController
@RequestMapping(value = "/article")
@RequiredArgsConstructor
@Log4j2
public class ArticleController {
    private final ArticleService aser;

    @RequestMapping(value = "/{aid}", method = RequestMethod.GET, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> read(@ModelAttribute("aid") Long aid){
        log.info("Read called :: aid =", aid);
        return new ResponseEntity<>(aser.read(aid), HttpStatus.OK);
    }
    
    @RequestMapping(value = "/admin/write", method = RequestMethod.POST, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> read(@RequestBody ArticleDTO dto){
        log.info("Write called :: dto =", dto);
        return new ResponseEntity<>(aser.write(dto), HttpStatus.OK);
    }


}
