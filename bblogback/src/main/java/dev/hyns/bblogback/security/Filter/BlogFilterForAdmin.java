package dev.hyns.bblogback.security.Filter;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import dev.hyns.bblogback.Redis.RedisUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class BlogFilterForAdmin extends OncePerRequestFilter{
    @Autowired
    private RedisUtil rUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        AntPathMatcher antPathMatcher = new AntPathMatcher();
        String token = request.getHeader("Authorization");

        if (antPathMatcher.match(request.getContextPath() + "/setting/**/*", request.getRequestURI())||antPathMatcher.match(request.getContextPath() + "/admin/**/*", request.getRequestURI())) {
            if (token.length() != 0 && rUtil.adminChecker(token)) {
                filterChain.doFilter(request, response);
            } else {
                response.sendRedirect("/login");
            }
        }
        filterChain.doFilter(request, response);
        
    }
}
