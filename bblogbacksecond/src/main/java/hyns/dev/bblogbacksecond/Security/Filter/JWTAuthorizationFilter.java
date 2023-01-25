package hyns.dev.bblogbacksecond.Security.Filter;

import java.io.IOException;

import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import hyns.dev.bblogbacksecond.Entity.Member;
import hyns.dev.bblogbacksecond.Repository.MemberRepository;
import hyns.dev.bblogbacksecond.Security.Service.UserDetailsServiceImpl;
import hyns.dev.bblogbacksecond.Utils.JWTManager;
import hyns.dev.bblogbacksecond.Utils.RedisManager;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JWTAuthorizationFilter extends OncePerRequestFilter {
    private final JWTManager jwtManager;
    private final RedisManager redisManager;
    private final MemberRepository mrepo;
    private final UserDetailsServiceImpl udserimpl;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String access = request.getHeader("access");
        String refresh = request.getHeader("refresh");
        if (access == null && refresh == null) {
            filterChain.doFilter(request, response);
            return;
        }
        Long atknMid = Long.parseLong(jwtManager.tokenParser(access).get("userNumber").toString());
        Long rtknMid = Long.parseLong(jwtManager.tokenParser(refresh).get("userNumber").toString());
        if (atknMid != rtknMid) {
            new UsernameNotFoundException("INVALID USER TOKEN");
        }
        Member member = mrepo.findById(rtknMid).orElseThrow(() -> new UsernameNotFoundException("INVALID USER"));
        
        if (!jwtManager.tokenValidator(access) && jwtManager.tokenValidator(refresh) && member.getLogged()) {
            access =  jwtManager.tokenGenerate(rtknMid, member.getEmail(), member.getNickname(), member.getImage(), 1L);
        }
        if (redisManager.TokenValidator(access, refresh)) {
            SecurityContextHolder.getContext().setAuthentication(getAuthentication(member.getEmail()));
            response.addHeader("Set-Cookie",
            ResponseCookie.from("access", "Bearer%20" +access.split(" ")[1]).path("/").build().toString());
            filterChain.doFilter(request, response);
        }
    }

    private Authentication getAuthentication(String email) {
        UserDetails userDetails = udserimpl.loadUserByUsername(email);
        return new UsernamePasswordAuthenticationToken(userDetails, userDetails.getPassword(),
                userDetails.getAuthorities());
    }

}
