package net.gumyo.bblog.utils;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import lombok.extern.log4j.Log4j2;

@Component
@Log4j2
public class JwtManager {

    private String secretKey = "BDMDSECRETKEYPLEASEENTERTHEKEYS1234567890";
    private static final long DAY = 24 * 60 * 60 * 1000;

    public List<String> tokenGenerator(Integer urkey, String email) {
        return List.of(
                tokenGenerate(urkey, email, -1L),
                tokenGenerate(urkey, email, 7L));
    }

    public String tokenGenerate(Integer urkey, String email, Long expireRate) {
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        Date today = new Date();
        String jwt = Jwts.builder()
                .setIssuer("gumyo.net")
                .setIssuedAt(today)
                .setExpiration(new Date(today.getTime() + DAY * expireRate))
                .claim("urkey", urkey)
                .claim("email", email)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
        return jwt;
    }

    public Boolean tokenValidator(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(secretKey.getBytes(StandardCharsets.UTF_8)).build()
                    .parseClaimsJws(token.split("Bearer ")[1]);
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
        return false;
    }

    public Claims tokenParser(String token) {
        try {
            return Jwts.parserBuilder().setSigningKey(secretKey.getBytes(StandardCharsets.UTF_8)).build()
                    .parseClaimsJws(token.split("Bearer ")[1]).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}