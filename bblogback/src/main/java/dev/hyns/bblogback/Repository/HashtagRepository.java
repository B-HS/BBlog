package dev.hyns.bblogback.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.hyns.bblogback.Entity.Hashtag;

public interface HashtagRepository extends JpaRepository<Hashtag, Long> {
    
}
