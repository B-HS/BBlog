package dev.hyns.bblogback.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.hyns.bblogback.Entity.Stacks;

@Repository
public interface StacksRepository extends JpaRepository<Stacks, Long>{
    
}
