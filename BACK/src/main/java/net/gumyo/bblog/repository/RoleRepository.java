package net.gumyo.bblog.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import net.gumyo.bblog.entity.AppRole;

public interface RoleRepository extends JpaRepository<AppRole, Long> {

}
