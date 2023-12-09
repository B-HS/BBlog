package net.gumyo.bblog.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import net.gumyo.bblog.entity.Menu;

public interface MenuRepository extends JpaRepository<Menu, Long> {
    List<Menu> findAllByMenameIn(List<String> mename);
}
