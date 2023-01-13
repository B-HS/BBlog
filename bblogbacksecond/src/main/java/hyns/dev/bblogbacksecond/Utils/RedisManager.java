package hyns.dev.bblogbacksecond.Utils;

import java.time.Duration;
import java.util.Optional;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import hyns.dev.bblogbacksecond.Entity.Member;
import hyns.dev.bblogbacksecond.Repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RedisManager {
    private final RedisTemplate<String, String> redisTemplate;
    private final MemberRepository mrepo;
    private final JWTManager manager;

    @Transactional
    public void setRefreshToken(String token, Long mid) {
        ValueOperations<String, String> refreshToken = redisTemplate.opsForValue();
        refreshToken.set(token, mid.toString(), Duration.ofDays(7L));
        mrepo.loggedMember(mid, true);
    }

    @Transactional
    public void removeRefreshToken(String refreshToken) {
        Optional<String> mid = Optional.ofNullable(redisTemplate.opsForValue().get(refreshToken));
        if (mid.isPresent()) {
            mrepo.loggedMember(Long.parseLong(mid.get()), false);
            redisTemplate.delete(refreshToken);
        }
    }

    @Transactional
    public Boolean TokenValidator(String accessToken, String refreshToken) {
        Optional<Member> targetMember = mrepo
                .findById(Long.parseLong(manager.tokenParser(accessToken).get("userNumber").toString()));
        Long accessTokenMemberId = targetMember.orElse(Member.builder().mid(0L).build()).getMid();
        Long refreshTokenMemberId = Long
                .parseLong(Optional.ofNullable(redisTemplate.opsForValue().get(refreshToken)).orElse("-1"));
        if (refreshTokenMemberId == accessTokenMemberId & manager.tokenValidator(refreshToken)
                & isLogged(accessToken)) {
            return true;
        } else {
            removeRefreshToken(refreshToken);
            mrepo.loggedMember(refreshTokenMemberId, false);
            return false;
        }
    }

    public Boolean refreshTokenChecker(String refreshToken) {
        return Optional.ofNullable(redisTemplate.opsForValue().get(refreshToken)).isPresent() ? true : false;
    }

    public Boolean isLogged(String aToken) {
        return mrepo.findById(Long.parseLong(manager.tokenParser(aToken).get("userNumber").toString()))
                .orElse(Member.builder().mid(0L).logged(false).build()).getLogged();
    }
}
