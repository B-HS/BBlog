package net.gumyo.bblog.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import net.gumyo.bblog.utils.JwtManager;
import net.gumyo.bblog.utils.redis.RedisRepository;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtManager jwtManager;
    private final UserDetailsServiceImpl udserimpl;
    private final RedisRepository redisRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String atk = request.getHeader("atk");
        String rtk = request.getHeader("rtk");
        if (atk == null && rtk == null) {
            filterChain.doFilter(request, response);
            return;
        }

        if (redisRepository.tokenChecker(atk, rtk)) {
            Claims user = jwtManager.tokenParser("Bearer " + rtk);
            SecurityContextHolder.getContext().setAuthentication(getAuthentication(user.get("email", String.class)));
            filterChain.doFilter(request, response);
            return;
        }
    }

    public Authentication getAuthentication(String name) {
        UserDetails userDetails = udserimpl.loadUserByUsername(name);
        return new UsernamePasswordAuthenticationToken(userDetails, userDetails.getPassword(),
                userDetails.getAuthorities());
    }
}