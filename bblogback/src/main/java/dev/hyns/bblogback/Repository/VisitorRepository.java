package dev.hyns.bblogback.Repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.hyns.bblogback.Entity.Visitor;

public interface VisitorRepository extends JpaRepository<Visitor, Long> {
    
    List<Visitor> findAllByRegDateGreaterThanEqualAndInitTrue(LocalDateTime today);
    List<Visitor> findAllByInitTrue();
    
}
