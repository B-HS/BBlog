package hyns.dev.bblogbacksecond.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import hyns.dev.bblogbacksecond.Security.Filter.AbstAuthProcessFilterImpl;
import hyns.dev.bblogbacksecond.Security.Filter.JWTAuthorizationFilter;
import hyns.dev.bblogbacksecond.Security.Handler.LoginSuccessHanlder;
import hyns.dev.bblogbacksecond.Security.Service.OauthAuthServiceImpl;
import hyns.dev.bblogbacksecond.Security.Service.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;

@EnableWebSecurity
@RequiredArgsConstructor
@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
    private final UserDetailsServiceImpl userDetailsServiceImpl;
    private final OauthAuthServiceImpl oauthAuthServiceImpl;
    private final LoginSuccessHanlder loginSuccessHanlder;
    private final JWTAuthorizationFilter jwtAuthorizationFilter;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http, AuthenticationManager authenticationManager)
            throws Exception {

        http.csrf().disable();
        http.httpBasic().disable();
        http.formLogin().disable();
        http.logout().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.authorizeHttpRequests().requestMatchers(
                "/article/write",
                "/article/modify",
                "/article/modifyinfo",
                "/image/upload",
                "/member/admin").hasAuthority("ADMIN");
        http.authorizeHttpRequests().requestMatchers(
                "/reply/*/user"
                ).hasAnyAuthority("USER", "OAUTH");
        http.authorizeHttpRequests(auth -> {
            auth.anyRequest().permitAll();
        });

        http.addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class);

        http.oauth2Login().authorizationEndpoint().baseUri("/oauth").and().userInfoEndpoint()
                .userService(oauthAuthServiceImpl).and().successHandler(loginSuccessHanlder);
        
        return http.build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsServiceImpl);
        provider.setPasswordEncoder(passwordEncoder());
        return new ProviderManager(provider);
    }

    @Bean
    AbstAuthProcessFilterImpl abstAuthProcessFilterImpl(AuthenticationManager authenticationManager) {
        AbstAuthProcessFilterImpl filter = new AbstAuthProcessFilterImpl();
        filter.setAuthenticationManager(authenticationManager);
        filter.setAuthenticationSuccessHandler(loginSuccessHanlder);
        return filter;
    }

}
