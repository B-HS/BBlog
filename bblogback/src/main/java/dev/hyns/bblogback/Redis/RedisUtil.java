package dev.hyns.bblogback.Redis;

import java.time.Duration;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import dev.hyns.bblogback.Entity.Roles;
import dev.hyns.bblogback.Repository.MembersRepository;
import dev.hyns.bblogback.security.JwtManager;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RedisUtil {
    private final RedisTemplate<String, String> rt;
    private final MembersRepository mrepo;
    private final JwtManager manager;

    public void setRefreshToken(String token, Long mid) {
        ValueOperations<String, String> rToken = rt.opsForValue();
        rToken.set(token, mid.toString(), Duration.ofMinutes(2L));
    }

    public void removeRefreshToken(String rToken) {
        rt.delete(rToken);
    }

    public Boolean tokenReIssueValidator(String aToken, String rToken) {
        String mid = Optional.ofNullable(rt.opsForValue().get(rToken))
                .orElseThrow(() -> new NoSuchElementException("토큰이 존재하지 않습니다"));
        Long atkMid = mrepo.findById((Long) manager.parseClaims(aToken).get("memberId"))
                .orElseThrow(() -> new NoSuchElementException("잘못된 토큰입니다")).getMid();

        if (Long.parseLong(mid) == atkMid & manager.tokenValidator(rToken) & manager.tokenValidator(aToken)) {
            return true;
        } else {
            return false;
        }
    }

    public Boolean adminChecker(String aToken) {
        return mrepo.findById((Long) manager
                .parseClaims(aToken)
                .get("memberId"))
                .orElseThrow(() -> new NoSuchElementException("잘못된 토큰입니다"))
                .getRoles().stream().anyMatch(v -> v.equals(Roles.ADMIN));
    }

}
