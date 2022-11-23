package dev.hyns.bblogback.security.Filter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import dev.hyns.bblogback.Redis.RedisUtil;
import jakarta.persistence.NoResultException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
@Log4j2
public class BlogFilterForAdmin extends OncePerRequestFilter {
    @Autowired
    private RedisUtil rUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        AntPathMatcher antPathMatcher = new AntPathMatcher();
        String token = request.getHeader("Authorization");

        List<String> pathList = Arrays.asList(new String[] { "/setting/**", "/admin/images/upload", "/admin/write", "/admin/stack", "/admin" });
        Boolean pathCheck = pathList.stream().anyMatch(v -> {
            if (antPathMatcher.match(request.getContextPath() + v, request.getRequestURI())
                    || antPathMatcher.match(v, request.getRequestURI())) {
                return true;
            } else {
                return false;
            }
        });
        if (pathCheck) {
            log.info(token);
            if (token == null || !rUtil.adminChecker(token)) {
                throw new NoResultException();
            }
        }
        filterChain.doFilter(request, response);
    }
}
