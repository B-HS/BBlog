package dev.hyns.bblogback.security.Filter;

import java.io.IOException;

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
        String token = request.getHeader("Authorization");
        if (antPathMatcher.match(request.getContextPath() + "/mypage/**/*", request.getRequestURI())) {
            if (token.length() != 0 && manager.tokenValidator(token)) {
                if(rUtil.adminChecker(token)){
                    response.sendRedirect("/setting");
                }
                filterChain.doFilter(request, response);
            } else {
                response.sendRedirect("/login");
            }
        }
        filterChain.doFilter(request, response);
    }
}
