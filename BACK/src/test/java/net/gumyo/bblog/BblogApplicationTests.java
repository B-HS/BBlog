package net.gumyo.bblog;

import java.util.List;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import net.gumyo.bblog.entity.Article;
import net.gumyo.bblog.entity.Menu;
import net.gumyo.bblog.entity.User;
import net.gumyo.bblog.entity.User.Role;
import net.gumyo.bblog.repository.ArticleRepository;
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
	@Autowired
	private ArticleRepository arepo;

	@Test
	void createUser() {
		User user = urepo.save(User
				.builder()
				.urname("admin")
				.urnickname("hs")
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
				createMenu("Dev", 0L),
				createMenu("Frontend", 1L),
				createMenu("Backend", 1L),
				createMenu("etc.", 0L),
				createMenu("Travel", 4L));
		mrepo.saveAll(menus);
	}

	@Test
	void createArticle() {
		arepo.saveAll(List.of(createArticle("test", new String[] { "test" }, "test"),
				createArticle("test2", new String[] { "test2" }, "test2"),
				createArticle("test3", new String[] { "test3" }, "test3")));

	}

	private Article createArticle(String title, String[] tags, String context) {
		return Article.builder()
				.title(title)
				.context(context)
				.tags(tags)
				.mekey(1L)
				.filelist(null)
				.hide(false)
				.build();
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
