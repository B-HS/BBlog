package net.gumyo.bblog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class BblogApplication {

	public static void main(String[] args) {
		SpringApplication.run(BblogApplication.class, args);
	}

}
