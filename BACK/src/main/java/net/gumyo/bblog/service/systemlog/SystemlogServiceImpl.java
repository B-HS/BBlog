package net.gumyo.bblog.service.systemlog;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import net.gumyo.bblog.entity.SystemLog;
import net.gumyo.bblog.repository.SystemLogRepository;

@Service
@RequiredArgsConstructor
public class SystemlogServiceImpl implements SystemlogService {
    private final SystemLogRepository slrepo;

    @Override
    public Map<String, Object> getDashboardInfo() {
        String before4week = dayGenerater(-28);
        String today = dayGenerater(0);
        return Map.of("forweeks", slrepo.getCustomResult(before4week, today), "fullbyip",
                slrepo.getUniqueIpv4ForMenuList());
    }

    private static String dayGenerater(int plusDays) {
        LocalDateTime now = LocalDateTime.now();
        ZoneId seoulZone = ZoneId.of("Asia/Seoul");
        LocalDateTime seoulTime = now.atZone(seoulZone).toLocalDateTime().plusDays(plusDays);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        String formattedDateTime = seoulTime.format(formatter);
        return formattedDateTime;
    }

    @Override
    public List<SystemLog> findAll() {
        return slrepo.findAll();
    }
}
