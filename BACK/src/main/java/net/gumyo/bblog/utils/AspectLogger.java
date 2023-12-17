package net.gumyo.bblog.utils;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import net.gumyo.bblog.entity.SystemLog;
import net.gumyo.bblog.repository.ArticleRepository;
import net.gumyo.bblog.repository.SystemLogRepository;

@Component
@Aspect
@RequiredArgsConstructor
public class AspectLogger {
    private final HttpServletRequest request;
    private final ArticleRepository arepo;
    private final SystemLogRepository slrepo;
    private final IpUtil ipUtil;

    @Pointcut("execution(* net.gumyo.bblog.controller.*.*(..))")
    public void controllerMethods() {
    }

    @Before("controllerMethods()")
    public void logBeforeControllerMethod(JoinPoint joinPoint) {
        String ipAddress = getClientIpAddress(request);
        String ipv4 = ipUtil.getIpv4ClientIpAddress(request);
        String controllerName = joinPoint.getTarget().getClass().getName();
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();
        String requestBody = Arrays.toString(args);
        long timestamp = System.currentTimeMillis();

        Date date = new Date(timestamp);
        String formattedDate = new SimpleDateFormat("yyyyMMddHHmmss").format(date);

        SystemLog syslog = SystemLog.builder()
                .controller(controllerName)
                .method(methodName)
                .params(requestBody)
                .ipv4(ipv4)
                .ipv6(ipAddress)
                .insertdate(String.valueOf(formattedDate))
                .build();

        slrepo.save(syslog);

        if (methodName.equals("getCommentsByAid")) {
            increateViewCount(Long.parseLong(requestBody.replace("[", "").replace("]", "")));
        }
    }

    private String getClientIpAddress(HttpServletRequest request) {
        return request.getRemoteAddr();
    }

    private void increateViewCount(Long aid) {
        arepo.findById(aid).ifPresent(article -> {
            article.increateViewCount();
            arepo.save(article);
        });
    }
}
