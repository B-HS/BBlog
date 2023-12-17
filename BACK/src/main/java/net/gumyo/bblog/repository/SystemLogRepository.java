package net.gumyo.bblog.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import net.gumyo.bblog.entity.SystemLog;

public interface SystemLogRepository extends JpaRepository<SystemLog, Long> {

}
