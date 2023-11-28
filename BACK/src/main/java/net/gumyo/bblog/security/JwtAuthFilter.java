package net.gumyo.bblog.security;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

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
    private ObjectMapper objectMapper = new ObjectMapper();

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
            Claims user = jwtManager.tokenParser(rtk);
            redisRepository.removeRefreshToken(rtk);
            List<String> tokens = jwtManager.tokenGenerator(user.get("urkey", Integer.class),
                    user.get("email", String.class));
            SecurityContextHolder.getContext().setAuthentication(getAuthentication(user.get("email", String.class)));
            Map<String, String> result = new HashMap<>();
            result.put("atk", tokens.get(0));
            result.put("rtk", tokens.get(1));
            response.getWriter().write(objectMapper.writeValueAsString(result));
            filterChain.doFilter(request, response);
        }
    }

    public Authentication getAuthentication(String name) {
        UserDetails userDetails = udserimpl.loadUserByUsername(name);
        return new UsernamePasswordAuthenticationToken(userDetails, userDetails.getPassword(),
                userDetails.getAuthorities());
    }
}