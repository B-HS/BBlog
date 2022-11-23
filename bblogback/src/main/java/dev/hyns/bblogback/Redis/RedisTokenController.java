package dev.hyns.bblogback.Redis;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import dev.hyns.bblogback.VO.TokenInfo;
import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
public class RedisTokenController {
    private final RedisUtil util;

    @RequestMapping(value = "/token/refreshing", method = RequestMethod.POST, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TokenInfo> atkRefrehing(@RequestHeader("mixedAuth") String miexAuth){
        TokenInfo result =  util.tokenReIssueValidator(miexAuth.split("hsxhzmsdlqslek")[0], miexAuth.split("hsxhzmsdlqslek")[1]);
        if(result.getRToken().length()==0){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }
    
    @RequestMapping(value = "/logout", method = RequestMethod.POST, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> logout(@RequestHeader("Authorization") String token){
        Boolean result;
        try {
            util.removeRefreshToken(token);
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
            result = false;
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(value = "/admin", method = RequestMethod.POST, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> isAdmin(@RequestHeader("Authorization") String token){
        return new ResponseEntity<Boolean>(util.adminChecker(token), HttpStatus.OK);
    }


}
