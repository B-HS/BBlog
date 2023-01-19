package hyns.dev.bblogbacksecond.Service.MemberService;

import java.util.List;
import java.util.Set;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import hyns.dev.bblogbacksecond.DTO.MemberDTO;
import hyns.dev.bblogbacksecond.DTO.Token;
import hyns.dev.bblogbacksecond.Entity.Member;
import hyns.dev.bblogbacksecond.Entity.Member.Role;
import hyns.dev.bblogbacksecond.Repository.MemberRepository;
import hyns.dev.bblogbacksecond.Utils.BlogMailSender;
import hyns.dev.bblogbacksecond.Utils.JWTManager;
import hyns.dev.bblogbacksecond.Utils.RedisManager;
import io.jsonwebtoken.Claims;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MemberServiceImpl implements MemberService {
    private final MemberRepository mrepo;
    private final PasswordEncoder encoder;
    private final RedisManager redisManager;
    private final JWTManager jwtManager;
    private final BlogMailSender mSender;

    @Override
    public Long join(MemberDTO dto) {
        if (!emailValidating(dto.getEmail()))
            return -1L;

        return mrepo.save(
                Member.builder()
                        .email(dto.getEmail())
                        .password(encoder.encode(dto.getPassword()))
                        .nickname(dto.getNickname())
                        .logged(false)
                        .image("basic.png")
                        .roles(Set.of(Role.USER))
                        .build())
                .getMid();

    }

    @Override
    public Boolean emailDuplicateCheck(String email) {
        return mrepo.existsByEmail(email);
    }

    @Override
    public Boolean emailAuthCodeRequest(String email) {
        int num = (int) (Math.random() * 10000);
        redisManager.generateEmailAuthorizationCode(email, String.valueOf(num));
        mSender.send(email, "BBlog 인증메일 안내", "인증 번호: " + num);
        return true;
    }

    @Override
    public Boolean emailAuthProvement(String email, Long authCode) {
        return redisManager.checkEmailAuthCode(email, String.valueOf(authCode));
    }

    @Override
    public Token tokenRefresher(String access, String refresh) {

        if (redisManager.TokenValidator(access, refresh)) {
            Claims info = jwtManager.tokenParser(refresh);
            List<String> result = jwtManager.AccessRefreshGenerator(Long.parseLong(info.get("userNumber").toString()),
                    info.get("email").toString(), info.get("nickname").toString());
            redisManager.removeRefreshToken(refresh.split(" ")[1]);
            redisManager.setRefreshToken(result.get(1), Long.parseLong(info.get("userNumber").toString()));
            return Token.builder().access(result.get(0)).refresh(result.get(1)).build();
        }
        return Token.builder().build();
    }

    @Override
    @Transactional
    public Boolean logout(String refresh) {
        Long mid = Long.parseLong(jwtManager.tokenParser(refresh).get("userNumber").toString());
        mrepo.findById(mid).ifPresent(v->{
            mrepo.loggedMember(mid, false);
        });
        redisManager.removeRefreshToken(refresh);

        return true;
    }

    @Override
    public Boolean adminChecker(String token) {
        Long mid = Long.parseLong(jwtManager.tokenParser(token).get("userNumber").toString());
        Set<Role> roles = mrepo.findById(mid).orElseThrow().getRoles();
        if(jwtManager.tokenValidator(token)&&roles.contains(Role.ADMIN)){
            return true;
        }
        return false;
    }

    private Boolean emailValidating(String email) {
        return email.trim().length() > 0 && !mrepo.existsByEmail(email);
    }

}
