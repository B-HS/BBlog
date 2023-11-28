package net.gumyo.bblog.security;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.util.StreamUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import net.gumyo.bblog.entity.User;

public class AbstAuthProcessFilterImpl extends AbstractAuthenticationProcessingFilter {
    public AbstAuthProcessFilterImpl() {
        super(new AntPathRequestMatcher("/login"));
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException, IOException, ServletException {
        ObjectMapper objMapper = new ObjectMapper();
        User user = objMapper.readValue(StreamUtils.copyToString(request.getInputStream(), StandardCharsets.UTF_8),
                User.class);
        return getAuthenticationManager()
                .authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPw()));
    }

}