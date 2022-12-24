package dev.hyns.bblogback.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.hyns.bblogback.Entity.Stacks;

public interface StacksRepository extends JpaRepository<Stacks, Long>{
    List<Stacks> findAllByOrderByIdxAsc();
}
