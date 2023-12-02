package net.gumyo.bblog;

import java.util.List;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import net.gumyo.bblog.entity.Menu;
import net.gumyo.bblog.entity.User;
import net.gumyo.bblog.entity.User.Role;
import net.gumyo.bblog.repository.MenuRepository;
import net.gumyo.bblog.repository.UserRepository;

@SpringBootTest
class BblogApplicationTests {
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private UserRepository urepo;
	@Autowired
	private MenuRepository mrepo;

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

	@Test
	void createMenu() {
		List<Menu> menus = List.of(
				createMenu("dev", 0L),
				createMenu("front", 1L),
				createMenu("back", 1L),
				createMenu("travel", 0L),
				createMenu("etc", 3L));
		mrepo.saveAll(menus);
	}

	private Menu createMenu(String menuname, Long parentmekey) {
		return Menu.builder()
				.mename(menuname)
				.parentmekey(parentmekey)
				.meorder(0)
				.hide(false)
				.icon(null)
				.build();
	}

}
