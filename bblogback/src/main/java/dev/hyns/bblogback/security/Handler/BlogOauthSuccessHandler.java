package dev.hyns.bblogback.security.Handler;

import java.io.IOException;
import java.net.URLEncoder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import dev.hyns.bblogback.Entity.Members;
import dev.hyns.bblogback.Redis.RedisUtil;
import dev.hyns.bblogback.Repository.MembersRepository;
import dev.hyns.bblogback.security.Util.JwtManager;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;

public class BlogOauthSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final MembersRepository mrepo;
    private final JwtManager manager;

    @Autowired
    private RedisUtil rUtil;

    public BlogOauthSuccessHandler(JwtManager manager, MembersRepository mrepo){
        this.manager = manager;
        this.mrepo = mrepo;
    }



    @Override
    @Transactional
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        Members memberInfo = mrepo.findByEmail(authentication.getName()).get();
        Long mid = memberInfo.getMid();
        String rToken = manager.RefreshTokenGenerator(memberInfo.getMid(), memberInfo.getEmail());
        rUtil.setRefreshToken(rToken, mid);

        ResponseCookie cookie1 = ResponseCookie.from("a", "Bearer%20"+manager.AccessTokenGenerator(memberInfo.getMid(), memberInfo.getEmail()).split(" ")[1]).domain("127.0.0.1").path("/").build();
        ResponseCookie cookie2 = ResponseCookie.from("r", "Bearer%20"+rToken.split(" ")[1].toString()).domain("127.0.0.1").path("/").build();
        Cookie user = new Cookie("user", "{%22id%22:%22"+memberInfo.getEmail()+"%22%2C%22num%22:"+mid.toString()+"%2C%22username%22:%22"+URLEncoder.encode(memberInfo.getNickname(), "UTF-8") +"%22}");
        user.setDomain("127.0.0.1");
        user.setPath("/");
        
        response.addHeader("Set-Cookie", cookie1.toString());
        response.addHeader("Set-Cookie", cookie2.toString());
        response.addCookie(user);

        if(memberInfo.getNickname()=="THISUSERNICKNAMEISNOTDEFINED"){
            response.sendRedirect("http://127.0.0.1:8080/initoauth");
        }else{
            response.sendRedirect("http://127.0.0.1:8080/");
        }
        
        super.onAuthenticationSuccess(request, response, authentication);
    }
}
