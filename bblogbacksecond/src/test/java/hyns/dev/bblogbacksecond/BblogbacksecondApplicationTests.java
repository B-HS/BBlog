package hyns.dev.bblogbacksecond;

import java.util.Set;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import hyns.dev.bblogbacksecond.Entity.Member;
import hyns.dev.bblogbacksecond.Entity.Member.Role;
import hyns.dev.bblogbacksecond.Repository.MemberRepository;

@SpringBootTest
class BblogbacksecondApplicationTests {
	@Autowired
	MemberRepository mrepo;
	@Autowired
	PasswordEncoder encoder;
	@Test
	void makeAdmin() {
		mrepo.save(Member.builder()
		.email("hsadmin")
		.password(encoder.encode(""))
		.image("basic.png")
		.logged(false)
		.nickname("HSADMIN")
		.roles(Set.of(Role.ADMIN, Role.USER))
		.build());
	}

}
