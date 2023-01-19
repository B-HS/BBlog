package hyns.dev.bblogbacksecond.Security.Filter;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.util.StreamUtils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nimbusds.jose.util.StandardCharset;

import hyns.dev.bblogbacksecond.DTO.MemberDTO;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AbstAuthProcessFilterImpl extends AbstractAuthenticationProcessingFilter {
    public AbstAuthProcessFilterImpl() {
        super(new AntPathRequestMatcher("/member/login"));
    }

    @Override

    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException, IOException, ServletException {

        ObjectMapper objMapper = new ObjectMapper();
        MemberDTO loginData = objMapper
                .readValue(StreamUtils.copyToString(request.getInputStream(), StandardCharset.UTF_8), MemberDTO.class);
        return getAuthenticationManager()
                .authenticate(new UsernamePasswordAuthenticationToken(loginData.getEmail(), loginData.getPassword()));
    }

}
