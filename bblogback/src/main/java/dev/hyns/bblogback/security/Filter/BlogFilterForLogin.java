package dev.hyns.bblogback.security.Filter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.util.StreamUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

import dev.hyns.bblogback.security.JwtManager;
import dev.hyns.bblogback.security.User.BlogCustomUser;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

@Log4j2
public class BlogFilterForLogin extends AbstractAuthenticationProcessingFilter {
    private JwtManager manager;
    public BlogFilterForLogin(JwtManager manager) {
        super(new AntPathRequestMatcher("/login"));
        this.manager = manager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException, IOException, ServletException {
        log.info("AbstractAuthenticationProcessingFilter called");
        log.info("authentication called");
        JSONObject obj = new JSONObject();
        try {
            obj = (JSONObject) new JSONParser().parse(StreamUtils.copyToString(request.getInputStream(), StandardCharsets.UTF_8));
            log.info(obj);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return getAuthenticationManager().authenticate(new UsernamePasswordAuthenticationToken(obj.get("email").toString(), obj.get("password").toString()));
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
            Authentication authResult) throws IOException, ServletException {
                String token = manager.tokenGenerator(((BlogCustomUser) authResult.getPrincipal()).getMid(), ((BlogCustomUser) authResult.getPrincipal()).getEmail());
                ObjectMapper mapper = new ObjectMapper();
                HashMap<String, Object> returnInfo = new HashMap<>();
                returnInfo.put("token", token);
                returnInfo.put("email", ((BlogCustomUser) authResult.getPrincipal()).getEmail());
                returnInfo.put("memberId", ((BlogCustomUser) authResult.getPrincipal()).getMid());
                returnInfo.put("nickname", ((BlogCustomUser) authResult.getPrincipal()).getNickname());
                // mapper.convertValue(returnInfo, BlogCustomUser.class)
                response.setContentType("application/json;charset=utf-8");
                
                response.getOutputStream().write(mapper.writeValueAsString(returnInfo).getBytes());
    }
}

