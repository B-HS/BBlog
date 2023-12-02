package net.gumyo.bblog;

import java.util.Set;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import net.gumyo.bblog.entity.User;
import net.gumyo.bblog.entity.User.Role;
import net.gumyo.bblog.repository.UserRepository;

@SpringBootTest
class BblogApplicationTests {
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private UserRepository urepo;

	@Test
	void createUser() {
		User user = urepo.save(User
				.builder()
				.urname("admin")
				.urnickname("bblog")
				.email("hs")
				.pw(passwordEncoder.encode("1234"))
				.isAuthed(true)
				.isDisabled(false)
				.isLogged(false)
				.introduce("HELLO!")
				.isDeleted(false)
				.title("BBlog")
				.subtitle("FINAL")
				.roles(Set.of(Role.ADMIN, Role.USER))
				.build());
		urepo.save(user);
	}

}
