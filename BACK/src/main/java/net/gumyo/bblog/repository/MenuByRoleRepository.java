package net.gumyo.bblog.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import net.gumyo.bblog.entity.Menubyrole;
import net.gumyo.bblog.entity.pks.MexroPk;

public interface MenuByRoleRepository extends JpaRepository<Menubyrole, MexroPk> {

}
