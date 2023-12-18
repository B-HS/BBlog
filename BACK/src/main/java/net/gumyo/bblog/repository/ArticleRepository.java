package net.gumyo.bblog.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import net.gumyo.bblog.entity.Article;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findAllByHideFalse();

    Page<Article> findAllByMekeyInAndHideFalse(List<Long> mekey, Pageable pageable);

    Article findByAidAndHideFalse(Long aid);

    List<Article> findAllByTitleLikeOrContextLikeAndHideFalse(String title, String context);

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

}
