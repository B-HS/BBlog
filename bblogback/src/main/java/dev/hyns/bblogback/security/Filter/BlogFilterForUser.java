package dev.hyns.bblogback.security.Filter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import dev.hyns.bblogback.Redis.RedisUtil;
import dev.hyns.bblogback.security.JwtManager;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class BlogFilterForUser extends OncePerRequestFilter {
    private JwtManager manager;
    @Autowired
    private RedisUtil rUtil;

    public BlogFilterForUser(JwtManager manager){
        this.manager = manager;
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        
        AntPathMatcher antPathMatcher = new AntPathMatcher();
        
        List<String> pathList = Arrays.asList(new String[] { "**/mypage/**/**", "/article/member/reply", "/article/member/reply/delete", "/member/reply/modify" });
        Boolean pathCheck = pathList.stream().anyMatch(v -> {
            if (antPathMatcher.match(request.getContextPath() + v, request.getRequestURI())
                    || antPathMatcher.match(v, request.getRequestURI())) {
                return true;
            } else {
                return false;
            }
        });


        String token = request.getHeader("Authorization");
        if (pathCheck) {
            if (token.length() != 0 && manager.tokenValidator(token)&& rUtil.isLogged(token)) {
                filterChain.doFilter(request, response);
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            }
            return;
        }
        filterChain.doFilter(request, response);
    }
}
