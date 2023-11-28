package net.gumyo.bblog.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import net.gumyo.bblog.entity.Locale;

public interface LocaleRepository extends JpaRepository<Locale, String> {
}
