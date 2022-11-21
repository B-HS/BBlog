package dev.hyns.bblogback.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import dev.hyns.bblogback.env;
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
    private String secretKey = env.SECRETKEY;
    private final long DAY = 259200000 / 3;
    private byte[] bytedKey = secretKey.getBytes(StandardCharsets.UTF_8);
    public String tokenGenerator(Long mid, String email) {
        
        SecretKey key = Keys.hmacShaKeyFor(bytedKey);
        Date today = new Date();
        String jwt = Jwts.builder()
                .setIssuer("hyns.dev")
                .setIssuedAt(today)
                .setExpiration(new Date(today.getTime() + DAY))
                .claim("email", email)
                .claim("userNumber", mid)
                .setSubject("bblog Login token")
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

        log.info("Token generated for ", email);

        return "Bearer "+jwt;
    }

    public Boolean tokenValidator(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(bytedKey).build().parseClaimsJws(token.split("Bearer ")[1]);
            return true;

        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("잘못된 토큰", e);
        } catch (ExpiredJwtException e) {
            log.info("유효기간이 지난 토큰", e);
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 토큰", e);
        } catch (IllegalArgumentException e) {
            log.info("claims가 비어있음", e);
        }
        log.info(parseClaims(token));
        return false;
    }

    private Claims parseClaims(String token) {
        try {
            return Jwts.parserBuilder().setSigningKey(bytedKey).build().parseClaimsJws(token).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }


}