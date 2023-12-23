package net.gumyo.bblog.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import net.gumyo.bblog.entity.SystemLog;

public interface SystemLogRepository extends JpaRepository<SystemLog, Long> {
        @Query("SELECT SUBSTRING(s.insertdate, 1, 8) AS dateGroup, " +
                        "s.params AS params, " +
                        "s.method AS method, " +
                        "MAX(s.ipv6) AS ipv6, " +
                        "s.ipv4 as ipv4, " +
                        "MAX(s.insertdate) AS insertdate " +
                        "FROM SystemLog s " +
                        "WHERE s.method = 'getArticle' " +
                        "AND SUBSTRING(s.insertdate, 1, 8) BETWEEN SUBSTRING(:startDate, 1, 8) AND  SUBSTRING(:endDate, 1, 8) "
                        +
                        "GROUP BY dateGroup, s.params, s.ipv4 " +
                        "ORDER BY dateGroup, s.params, s.ipv4")
        List<CustomLogResult> getCustomResult(@Param("startDate") String startDate,
                        @Param("endDate") String endDate);

        @Query("SELECT SUBSTRING(s.insertdate, 1, 8) AS dateGroup, " +
                        "MAX(s.ipv4) AS ipv4, " +
                        "s.method " +
                        "FROM SystemLog s " +
                        "WHERE s.method = 'getMenuList' " +
                        "GROUP BY dateGroup, s.ipv4 " +
                        "ORDER BY dateGroup, s.ipv4")
        List<CustomLogResult> getUniqueIpv4ForMenuList();

        interface CustomLogResult {
                String getDateGroup();

                String getParams();

                String getMethod();

                String getIpv6();

                String getIpv4();

                String getInsertDate();
        }
}
