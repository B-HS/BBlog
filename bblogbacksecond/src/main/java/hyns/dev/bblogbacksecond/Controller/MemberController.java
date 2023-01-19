package hyns.dev.bblogbacksecond.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hyns.dev.bblogbacksecond.DTO.MemberDTO;
import hyns.dev.bblogbacksecond.DTO.Token;
import hyns.dev.bblogbacksecond.Service.MemberService.MemberService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("member")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService mser;
    @PostMapping("emaildup")
    public ResponseEntity<Boolean> emailDuplicateCheck(@RequestBody MemberDTO dto) {
        return new ResponseEntity<>(mser.emailDuplicateCheck(dto.getEmail()), HttpStatus.OK);
    }

    @PostMapping("emailauth")
    public ResponseEntity<Boolean> emailAuthCodeRequest(@RequestBody MemberDTO dto) {
        return new ResponseEntity<>(mser.emailAuthCodeRequest(dto.getEmail()), HttpStatus.OK);
    }

    @PostMapping("authprove")
    public ResponseEntity<Boolean> emailAuthProvement(@RequestBody MemberDTO dto) {
        //mid로 대신받음
        Long authCode = dto.getMid();
        return new ResponseEntity<>(mser.emailAuthProvement(dto.getEmail(), authCode), HttpStatus.OK);
    }

    @PostMapping("join")
    public ResponseEntity<Long> memberJoin(@RequestBody MemberDTO dto) {
        return new ResponseEntity<>(mser.join(dto), HttpStatus.OK);
    }

    @PostMapping("token")
    public ResponseEntity<Token> tokenGenerator(@RequestBody Token tkn){
        return new ResponseEntity<>(mser.tokenRefresher(tkn.getAccess(), tkn.getRefresh()), HttpStatus.OK);
    }

    @PostMapping("logout")
    public ResponseEntity<Boolean> logout(@RequestBody Token tkn){
        return new ResponseEntity<>(mser.logout(tkn.getRefresh()), HttpStatus.OK);
    }

    @PostMapping("admin")
    public ResponseEntity<Boolean> adminCheck(@RequestBody Token tkn){
        return new ResponseEntity<>(mser.adminChecker(tkn.getRefresh()), HttpStatus.OK);
    }
    
}
