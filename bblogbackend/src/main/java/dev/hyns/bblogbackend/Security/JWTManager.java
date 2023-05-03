package dev.hyns.bblogbackend.Security;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;

@Component
public class JWTManager {
    @Value("${dev.hyns.secretkey}")
    private String secretKey;
    private final long DAY = 259200000 / 3;

    public String tokenGenerate(String id, String nickname, String userImg, Long expireRate) {
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        Date today = new Date();
        return Jwts.builder().setIssuer("hyns.dev").setIssuedAt(today).setExpiration(new Date(today.getTime() + ((DAY / 24 / 6) * expireRate))).claim("nickname", nickname).claim("userImg", userImg).setSubject("bblog token").signWith(key, SignatureAlgorithm.HS256).compact();
    }

    public Boolean tokenValidator(String token) {
        try {Jwts.parserBuilder().setSigningKey(secretKey.getBytes(StandardCharsets.UTF_8)).build().parseClaimsJws(token.split("Bearer ")[1]);
            return true;
        } catch (SecurityException | MalformedJwtException |ExpiredJwtException | UnsupportedJwtException |IllegalArgumentException e) {new Exception("token exception");}
        return false;
    }

    public Claims tokenParser(String token) {
        try {return Jwts.parserBuilder().setSigningKey(secretKey.getBytes(StandardCharsets.UTF_8)).build().parseClaimsJws(token.split("Bearer ")[1]).getBody();}
        catch (ExpiredJwtException e) {return e.getClaims();}
    }
}
