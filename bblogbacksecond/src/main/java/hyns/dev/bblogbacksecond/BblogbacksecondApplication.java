package hyns.dev.bblogbacksecond;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class BblogbacksecondApplication {

	public static void main(String[] args) {
		SpringApplication.run(BblogbacksecondApplication.class, args);
	}

}
