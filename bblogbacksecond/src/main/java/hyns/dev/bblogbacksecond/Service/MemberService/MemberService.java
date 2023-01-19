package hyns.dev.bblogbacksecond.Service.MemberService;

import hyns.dev.bblogbacksecond.DTO.MemberDTO;
import hyns.dev.bblogbacksecond.DTO.Token;

public interface MemberService {
    Long join(MemberDTO dto);
    Boolean logout(String refresh);
    Boolean adminChecker(String token);
    Boolean emailDuplicateCheck(String email);
    Boolean emailAuthCodeRequest(String email);
    Boolean emailAuthProvement(String email, Long authCode);
    Token tokenRefresher (String access, String refresh);
}
