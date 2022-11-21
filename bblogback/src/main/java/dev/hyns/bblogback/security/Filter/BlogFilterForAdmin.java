package dev.hyns.bblogback.security.Filter;

import java.io.IOException;

import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import dev.hyns.bblogback.security.JwtManager;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class BlogFilterForAdmin extends OncePerRequestFilter {
    private JwtManager manager;

    public BlogFilterForAdmin(JwtManager manager){
        this.manager = manager;
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        AntPathMatcher antPathMatcher = new AntPathMatcher();
        String token = request.getHeader("jwt");
        if (antPathMatcher.match(request.getContextPath() + "/admin/**/*", request.getRequestURI())) {
            if (token.length() == 0 && manager.tokenValidator(token)) {
                filterChain.doFilter(request, response);
            } else {
                response.sendRedirect("/login");
            }
        }
        filterChain.doFilter(request, response);
    }
}
