package net.gumyo.bblog.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import net.gumyo.bblog.entity.Menu;

public interface MenuRepository extends JpaRepository<Menu, Long> {

    @Query(value = "SELECT DISTINCT me.* " +
            "FROM menu me " +
            "     LEFT OUTER JOIN menubyrole mb " +
            "                  ON me.mekey = mb.mekey " +
            "WHERE mb.rokey IN :rokey " +
            "ORDER BY me.parentmekey ASC, me.meorder ASC ", nativeQuery = true)
    List<Menu> getMenuByUserRole(Long[] rokey);
}
