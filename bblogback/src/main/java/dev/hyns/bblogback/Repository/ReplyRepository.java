package dev.hyns.bblogback.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import dev.hyns.bblogback.Entity.Reply;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Long>{
    @Modifying
    @Query("UPDATE Reply rp set rp.context=:context where rp.rid =:rid")
	void updateReply(Long rid, String context);
}
