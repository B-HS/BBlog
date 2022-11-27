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

    @Modifying
    @Query("UPDATE Members mb set mb.nickname=:nickname where mb.mid =:mid")
	void updateNicname(Long mid, String nickname);

    @Modifying
    @Query("UPDATE Members mb set mb.nickname=:nickname, mb.password=:password where mb.mid =:mid")
	void updateNicnameAndPasswd(Long mid, String nickname, String password);

    @Query(
    "SELECT mb.mid as mid, mb.nickname as nickname, mb.userimg as picture, count(rp.rid) as replyCount "+
    "FROM Members mb left join Reply rp on mb.mid=rp.mid "+
    "WHERE mb.mid=:mid"
    )
    getDropboxInfo dropboxInfo(Long mid);

    public interface getDropboxInfo{
        Long getMid();
        String getNickname();
        String getPicture();
        Integer getReplyCount();
    }
}
