package dev.hyns.bblogback.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.hyns.bblogback.Entity.Members;

@Repository
public interface MembersRepository extends JpaRepository<Members, Long>{
    
}
