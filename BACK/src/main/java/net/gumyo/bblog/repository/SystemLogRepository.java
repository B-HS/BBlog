package net.gumyo.bblog.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import net.gumyo.bblog.entity.SystemLog;

public interface SystemLogRepository extends JpaRepository<SystemLog, Long> {
    @Query("SELECT SUBSTRING(s.insertdate, 1, 8) AS dateGroup, " +
            "s.params, " +
            "s.method, " +
            "MAX(s.ipv6) AS ipv6, " +
            "s.ipv4, " +
            "MAX(s.insertdate) AS insertdate " +
            "FROM SystemLog s " +
            "WHERE s.method = 'getArticle' " +
            "AND SUBSTRING(s.insertdate, 1, 8) BETWEEN SUBSTRING(:startDate, 1, 8) AND  SUBSTRING(:endDate, 1, 8) " +
            "GROUP BY dateGroup, s.params, s.ipv4 " +
            "ORDER BY dateGroup, s.params, s.ipv4")
    List<Map<String, Object>> getCustomResult(@Param("startDate") String startDate, @Param("endDate") String endDate);

    @Query("SELECT SUBSTRING(s.insertdate, 1, 8) AS dateGroup, " +
            "MAX(s.ipv4) AS ipv4, " +
            "s.method " +
            "FROM SystemLog s " +
            "WHERE s.method = 'getMenuList' " +
            "GROUP BY dateGroup, s.ipv4 " +
            "ORDER BY dateGroup, s.ipv4")
    List<Object[]> getUniqueIpv4ForMenuList();
}
