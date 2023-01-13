package hyns.dev.bblogbacksecond.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import hyns.dev.bblogbacksecond.Entity.Visitor;

public interface VisitorRepository extends JpaRepository<Visitor, Long> {
    
}
