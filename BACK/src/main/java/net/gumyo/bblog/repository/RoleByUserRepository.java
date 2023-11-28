package net.gumyo.bblog.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import net.gumyo.bblog.entity.RoleByUser;
import net.gumyo.bblog.entity.pks.RoxurPK;

public interface RoleByUserRepository extends JpaRepository<RoleByUser, RoxurPK> {
    List<RoleByUser> findByPkUrkey(Integer urkey);

}
