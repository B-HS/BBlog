package dev.hyns.bblogback.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.hyns.bblogback.Entity.Menu;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long>{
    
}
