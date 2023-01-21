package hyns.dev.bblogbacksecond.Security.Handler;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import hyns.dev.bblogbacksecond.Entity.Member;
import hyns.dev.bblogbacksecond.Entity.Member.Role;
import hyns.dev.bblogbacksecond.Repository.MemberRepository;
import hyns.dev.bblogbacksecond.Utils.JWTManager;
import hyns.dev.bblogbacksecond.Utils.RedisManager;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class LoginSuccessHanlder extends SimpleUrlAuthenticationSuccessHandler {
    private final MemberRepository mrepo;
    private final RedisManager redisManager;
    private final JWTManager jwtManager;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
        Member member = mrepo.findByEmail(authentication.getName()).get();
        List<String> tokenList = jwtManager.AccessRefreshGenerator(member.getMid(), member.getEmail(),
                member.getNickname());
        redisManager.setRefreshToken(tokenList.get(1), member.getMid());
        ResponseCookie cookie1 = ResponseCookie.from("access", "Bearer%20" + tokenList.get(0)).path("/").build();
        ResponseCookie cookie2 = ResponseCookie.from("refresh", "Bearer%20" + tokenList.get(1)).path("/").build();

        if (member.getRoles().contains(Role.OAUTH)) {
            if (member.getNickname().length() == 0 || member.getPassword().length() == 0) {
                response.sendRedirect("http://" + "192.168.0.100" + ":3000/initoauth");
            } else {
                response.sendRedirect("http://" + "192.168.0.100" + ":3000/token/"+"Bearer%20" + tokenList.get(0)+"/"+"Bearer%20" + tokenList.get(1));
            }
        } else {
            response.addHeader("Set-Cookie", cookie1.toString());
            response.addHeader("Set-Cookie", cookie2.toString());
            response.sendRedirect("http://" + "192.168.0.100" + ":3000");

        }

        super.onAuthenticationSuccess(request, response, authentication);
    }

}
