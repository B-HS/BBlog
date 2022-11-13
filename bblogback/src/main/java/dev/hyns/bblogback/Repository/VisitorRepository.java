package dev.hyns.bblogback.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.hyns.bblogback.Entity.Visitor;

@Repository
public interface VisitorRepository extends JpaRepository<Visitor, Long> {
    
}
