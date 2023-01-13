package hyns.dev.bblogbacksecond.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import hyns.dev.bblogbacksecond.Entity.Reply;

public interface ReplyRepository extends JpaRepository<Reply, Long>{
    
}
