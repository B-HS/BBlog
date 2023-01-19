package hyns.dev.bblogbacksecond.Utils;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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

    public List<String> AccessRefreshGenerator(Long memberId, String email, String nickname) {
        List<String> tokenAry = new ArrayList<>();
        tokenAry.add(tokenGenerate(memberId, email, nickname, 1L));
        tokenAry.add(tokenGenerate(memberId, email, nickname, 7L));
        return tokenAry;
    }

    public String tokenGenerate(Long memberId, String email, String nickname, Long expireRate) {
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        Date today = new Date();
        String jwt = Jwts.builder()
                .setIssuer("hyns.dev")
                .setIssuedAt(today)
                .setExpiration(new Date(today.getTime() + ((DAY / 24 / 6) * expireRate)))
                .claim("email", email)
                .claim("userNumber", memberId)
                .claim("nickname", nickname)
                .setSubject("bblog token")
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
        } catch (ExpiredJwtException e) {
        } catch (UnsupportedJwtException e) {
        } catch (IllegalArgumentException e) {
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
