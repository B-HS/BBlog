package net.gumyo.bblog.security.handler;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import net.gumyo.bblog.entity.User;
import net.gumyo.bblog.repository.UserRepository;
import net.gumyo.bblog.service.menu.MenuService;
import net.gumyo.bblog.utils.JwtManager;
import net.gumyo.bblog.utils.redis.RedisRepository;

@Component
@RequiredArgsConstructor
public class LoginSuccess implements AuthenticationSuccessHandler {
    private final UserRepository urepo;
    private final JwtManager jwtManager;
    private final RedisRepository redisManager;
    private final MenuService mser;
    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    @Transactional
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException, UsernameNotFoundException {
        User user = urepo.findByUrname(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        List<String> tokens = jwtManager.tokenGenerator(user.getUrkey(), user.getEmail());
        Map<String, Object> result = new HashMap<>();
        urepo.loggedMember(user.getUrkey(), true);
        redisManager.setRefreshToken(tokens.get(1), user.getUrkey());
        result.put("atk", tokens.get(0));
        result.put("rtk", tokens.get(1));
        result.put("userInfo", user.getLoginInfo());
        result.put("menu", mser.menuListByUrkey(user.getUrkey()));
        response.getWriter().write(objectMapper.writeValueAsString(result));
    }
}