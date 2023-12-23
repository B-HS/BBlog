package net.gumyo.bblog.security;

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

import lombok.RequiredArgsConstructor;
import net.gumyo.bblog.security.handler.LoginFailure;
import net.gumyo.bblog.security.handler.LoginSuccess;

@EnableWebSecurity
@RequiredArgsConstructor
@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    private final UserDetailsServiceImpl userDetailsServiceImpl;
    private final JwtAuthFilter jwtAuthFilter;
    private final LoginSuccess loginSuccess;
    private final LoginFailure loginFailure;

    HttpSecurity setDefaultConfig(HttpSecurity http) throws Exception {
        http.csrf(val -> val.disable());
        http.httpBasic(val -> val.disable());
        http.formLogin(val -> val.disable());
        http.logout(val -> val.disable());
        http.sessionManagement(val -> val.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        return http;
    }

    HttpSecurity setFilterConfig(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(
                val -> val.requestMatchers("/admin/**").hasAuthority("ADMIN").anyRequest().permitAll());
        http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http;
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http, AuthenticationManager authenticationManager) throws Exception {
        setDefaultConfig(http);
        setFilterConfig(http);
        return http.build();
    }

    @Bean
    AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsServiceImpl);
        provider.setPasswordEncoder(passwordEncoder());
        return new ProviderManager(provider);
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    AbstAuthProcessFilterImpl abstAuthProcessFilterImpl(AuthenticationManager authenticationManager) {
        AbstAuthProcessFilterImpl filter = new AbstAuthProcessFilterImpl();
        filter.setAuthenticationManager(authenticationManager);
        filter.setAuthenticationSuccessHandler(loginSuccess);
        filter.setAuthenticationFailureHandler(loginFailure);
        return filter;
    }
}