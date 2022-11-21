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

import dev.hyns.bblogback.security.JwtManager;
import dev.hyns.bblogback.security.Filter.BlogFilterForAdmin;
import dev.hyns.bblogback.security.Filter.BlogFilterForLogin;
import lombok.RequiredArgsConstructor;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig{
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, AuthenticationManager authenticationManager)
            throws Exception{
        http.csrf().disable();
        http.httpBasic().disable();
        http.formLogin().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(blogFilterForAdmin(), UsernamePasswordAuthenticationFilter.class);
        http.addFilterBefore(blogFilterForAdmin(), UsernamePasswordAuthenticationFilter.class);
        http.addFilterBefore(blogAbstractAuthenticationProcessingFilter(authenticationManager), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public BlogFilterForAdmin blogFilterForAdmin(){
        return new BlogFilterForAdmin(jwtManager());
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public BlogFilterForLogin blogAbstractAuthenticationProcessingFilter(AuthenticationManager authenticationManager){
        BlogFilterForLogin restLogin = new BlogFilterForLogin(jwtManager());
        restLogin.setAuthenticationManager(authenticationManager);
        return restLogin;
    }

    @Bean
    public JwtManager jwtManager(){
        return new JwtManager();
    }

}
