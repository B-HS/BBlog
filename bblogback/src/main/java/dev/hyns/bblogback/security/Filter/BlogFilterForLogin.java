package dev.hyns.bblogback.security.Filter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.util.StreamUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

import dev.hyns.bblogback.Redis.RedisUtil;

import dev.hyns.bblogback.security.JwtManager;
import dev.hyns.bblogback.security.User.BlogCustomUser;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class BlogFilterForLogin extends AbstractAuthenticationProcessingFilter {
    private JwtManager manager;
    
    @Autowired
    private RedisUtil rUtil;

    public BlogFilterForLogin(JwtManager manager) {
        super(new AntPathRequestMatcher("/login"));
        this.manager = manager;
        
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException, IOException, ServletException {
        JSONObject obj = new JSONObject();
        try {
            obj = (JSONObject) new JSONParser().parse(StreamUtils.copyToString(request.getInputStream(), StandardCharsets.UTF_8));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return getAuthenticationManager().authenticate(new UsernamePasswordAuthenticationToken(obj.get("email").toString(), obj.get("password").toString()));
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
            Authentication authResult) throws IOException, ServletException {
                String email = ((BlogCustomUser) authResult.getPrincipal()).getEmail();
                Long userNum = ((BlogCustomUser) authResult.getPrincipal()).getMid();
                String token = manager.AccessTokenGenerator(userNum, email);
                String rToken = manager.RefreshTokenGenerator(userNum, email);
                ObjectMapper mapper = new ObjectMapper();
                HashMap<String, Object> returnInfo = new HashMap<>();
                returnInfo.put("token", token);
                returnInfo.put("rToken", rToken);
                returnInfo.put("email", email);
                returnInfo.put("memberId", userNum);
                returnInfo.put("nickname", ((BlogCustomUser) authResult.getPrincipal()).getNickname());
                rUtil.setRefreshToken(rToken, userNum);
                response.setContentType("application/json;charset=utf-8");
                response.getOutputStream().write(mapper.writeValueAsString(returnInfo).getBytes());
    }
}

