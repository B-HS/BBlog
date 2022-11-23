package dev.hyns.bblogback.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import dev.hyns.bblogback.Entity.Members;

@Repository
public interface MembersRepository extends JpaRepository<Members, Long>{
    Optional<Members> findByEmail(String email);
    Boolean existsByEmail(String email);

    @Modifying
    @Query("UPDATE Members mb set mb.logged=:logged where mb.mid =:mid")
	void loggedMember(Long mid, boolean logged);
}
