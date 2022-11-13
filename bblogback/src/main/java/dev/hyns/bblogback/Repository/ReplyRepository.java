package dev.hyns.bblogback.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.hyns.bblogback.Entity.Reply;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Long>{
    
}
