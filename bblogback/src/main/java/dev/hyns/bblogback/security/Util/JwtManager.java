package dev.hyns.bblogback.security.Util;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import lombok.extern.log4j.Log4j2;

@Log4j2
public class JwtManager {
    @Value("${dev.hyns.secretkey}")
    private String secretKey;
    private final long DAY = 259200000 / 3;

    public String AccessTokenGenerator(Long mid, String email) {
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        Date today = new Date();
        String jwt = Jwts.builder()
                .setIssuer("hyns.dev")
                .setIssuedAt(today)
                .setExpiration(new Date(today.getTime() + DAY/24/6))
                .claim("email", email)
                .claim("userNumber", mid)
                .setSubject("bblog token")
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
        return "Bearer "+jwt;
    }

    public String RefreshTokenGenerator(Long mid, String email) {
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        Date today = new Date();
        String jwt = Jwts.builder()
                .setIssuer("hyns.dev")
                .setIssuedAt(today)
                .setExpiration(new Date(today.getTime() + DAY*7))
                .claim("email", email)
                .claim("userNumber", mid)
                .setSubject("bblog token")
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
        return "Bearer "+jwt;
    }

    public Boolean tokenValidator(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(secretKey.getBytes(StandardCharsets.UTF_8)).build().parseClaimsJws(token.split("Bearer ")[1]);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("????????? ??????", e);
            return false;
        } catch (ExpiredJwtException e) {
            log.info("??????????????? ?????? ??????", e);
            return false;
        } catch (UnsupportedJwtException e) {
            log.info("???????????? ?????? ??????", e);
            return false;
        } catch (IllegalArgumentException e) {
            log.info("claims??? ????????????", e);
            return false;
        }
    }

    public Claims parseClaims(String token) {
        try {
            return Jwts.parserBuilder().setSigningKey(secretKey.getBytes(StandardCharsets.UTF_8)).build().parseClaimsJws(token.split("Bearer ")[1]).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }


}