package dev.hyns.bblogback.Configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import dev.hyns.bblogback.security.Filter.BlogFilterForUser;
import dev.hyns.bblogback.security.Handler.BlogOauthSuccessHandler;
import dev.hyns.bblogback.security.Service.BlogOauthService;
import dev.hyns.bblogback.security.Util.JwtManager;
import lombok.RequiredArgsConstructor;
import dev.hyns.bblogback.Repository.MembersRepository;
import dev.hyns.bblogback.security.Filter.BlogFilterForAdmin;
import dev.hyns.bblogback.security.Filter.BlogFilterForLogin;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    private final BlogOauthService boser;
    private final MembersRepository mrepo;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, AuthenticationManager authenticationManager)
            throws Exception {
        http.csrf().disable();
        http.httpBasic().disable();
        http.formLogin().disable();
        http.logout().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(blogFilterForLogin(authenticationManager),UsernamePasswordAuthenticationFilter.class);
        http.addFilterBefore(blogFilterForAdmin(), UsernamePasswordAuthenticationFilter.class);
        http.addFilterBefore(blogFilterForUser(), UsernamePasswordAuthenticationFilter.class);
        http.oauth2Login().authorizationEndpoint().baseUri("/oauth2").and().userInfoEndpoint().userService(boser).and().successHandler(blogOauthSuccessHandler());
        return http.build();
    }

    @Bean
    public BlogFilterForAdmin blogFilterForAdmin() {
        return new BlogFilterForAdmin();
    }

    @Bean
    public BlogFilterForUser blogFilterForUser() {
        return new BlogFilterForUser(jwtManager());
    }

    @Bean
    public BlogFilterForLogin blogFilterForLogin(AuthenticationManager authenticationManager) {
        BlogFilterForLogin restLogin = new BlogFilterForLogin(jwtManager());
        restLogin.setAuthenticationManager(authenticationManager);
        return restLogin;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public BlogOauthSuccessHandler blogOauthSuccessHandler(){
        return new BlogOauthSuccessHandler(jwtManager(), mrepo);
    }

    @Bean
    public JwtManager jwtManager() {
        return new JwtManager();
    }

}
