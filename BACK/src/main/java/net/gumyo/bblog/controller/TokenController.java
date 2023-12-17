
package net.gumyo.bblog.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import net.gumyo.bblog.utils.JwtManager;
import net.gumyo.bblog.utils.redis.RedisRepository;

@RestController
@RequestMapping("/token")
@RequiredArgsConstructor
public class TokenController {
    private final RedisRepository redisRepository;
    private final JwtManager jwtManager;

    @PostMapping("/check")
    public Map<String, Object> postMethodName(@RequestBody Map<String, Object> tokens) {
        String atk = tokens.get("atk").toString();
        String rtk = tokens.get("rtk").toString();
        if (atk == null && rtk == null) {
            return null;
        }

        if (!redisRepository.tokenChecker("Bearer " + atk, rtk)) {
            return null;
        }

        Claims user = jwtManager.tokenParser("Bearer " + rtk);
        List<String> newTokens = jwtManager.tokenGenerator(user.get("urkey", Integer.class),
                user.get("email", String.class));
        redisRepository.setRefreshToken(newTokens.get(1), user.get("urkey", Integer.class));

        return Map.of("atk", newTokens.get(0), "rtk", newTokens.get(1));
    }

}
