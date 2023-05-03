package dev.hyns.bblogbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class BblogbackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BblogbackendApplication.class, args);
	}
}
