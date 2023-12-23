package net.gumyo.bblog.service.systemlog;

import java.util.List;
import java.util.Map;

import net.gumyo.bblog.entity.SystemLog;

public interface SystemlogService {
    Map<String, Object> getDashboardInfo();

    List<SystemLog> findAll();
}
