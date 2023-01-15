package hyns.dev.bblogbacksecond.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import hyns.dev.bblogbacksecond.Entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
    @Modifying
    @Query("UPDATE Member mb set mb.logged=:logged where mb.mid =:memberId")
    void loggedMember(Long memberId, boolean logged);
}
