package dev.hyns.bblogback.Redis;

import java.time.Duration;
import java.util.Optional;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import dev.hyns.bblogback.Entity.Members;
import dev.hyns.bblogback.Entity.Roles;
import dev.hyns.bblogback.Repository.MembersRepository;
import dev.hyns.bblogback.VO.TokenInfo;
import dev.hyns.bblogback.security.JwtManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RedisUtil {
    private final RedisTemplate<String, String> rt;
    private final MembersRepository mrepo;
    private final JwtManager manager;

    @Transactional
    public void setRefreshToken(String token, Long mid) {
        ValueOperations<String, String> rToken = rt.opsForValue();
        rToken.set(token, mid.toString(), Duration.ofDays(7L));
        mrepo.loggedMember(mid, true);
    }

    @Transactional
    public void removeRefreshToken(String rToken) {
        Optional<String> mid = Optional.ofNullable(rt.opsForValue().get(rToken));
        if (mid.isPresent()) {
            mrepo.loggedMember(Long.parseLong(mid.get()), false);
            rt.delete(rToken);
        }
    }

    @Transactional
    public TokenInfo tokenReIssueValidator(String aToken, String rToken) {
        Optional<Members> targetMember = mrepo
                .findById(Long.parseLong(manager.parseClaims(aToken).get("userNumber").toString()));
        Long atkMid = targetMember.orElse(Members.builder().mid(0L).oauth(false).build()).getMid();
        String mid = Optional.ofNullable(rt.opsForValue().get(rToken)).orElse("-1");
        if (Long.parseLong(mid) == atkMid & manager.tokenValidator(rToken) & isLogged(aToken)) {
            String rtkn = manager.RefreshTokenGenerator(targetMember.get().getMid(), targetMember.get().getEmail());
            String atkn = manager.AccessTokenGenerator(targetMember.get().getMid(), targetMember.get().getEmail());
            removeRefreshToken(rToken);
            setRefreshToken(rtkn, targetMember.get().getMid());
            return TokenInfo.builder()
                    .aToken(atkn)
                    .rToken(rtkn)
                    .build();
        } else {
            removeRefreshToken(rToken);
            mrepo.loggedMember(Long.parseLong(mid), false);
            return null;
        }
    }

    public Boolean rTokenChecker(String rToken) {
        return Optional.ofNullable(rt.opsForValue().get(rToken)).isPresent() ? true : false;
    }

    public Boolean adminChecker(String rToken) {
        return mrepo.findById(Long.parseLong(manager.parseClaims(rToken).get("userNumber").toString()))
                .orElse(Members.builder().mid(0L).oauth(false).build()).getRoles().stream()
                .anyMatch(v -> v.equals(Roles.ROLE_ADMIN));
    }

    public Boolean isLogged(String aToken) {
        return mrepo.findById(Long.parseLong(manager.parseClaims(aToken).get("userNumber").toString()))
                .orElse(Members.builder().mid(0L).oauth(false).logged(false).build()).isLogged();
    }

}
