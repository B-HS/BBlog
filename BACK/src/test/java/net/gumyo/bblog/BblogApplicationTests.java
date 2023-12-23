package net.gumyo.bblog;

import java.util.List;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import net.gumyo.bblog.entity.Article;
import net.gumyo.bblog.entity.Menu;
import net.gumyo.bblog.entity.Menu.MenuType;
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
				createMenu("Introduce", 0L, MenuType.PAGE),
				createMenu("Dev", 0L, MenuType.LIST),
				createMenu("Frontend", 2L, MenuType.LIST),
				createMenu("Backend", 2L, MenuType.LIST),
				createMenu("etc.", 0L, MenuType.LIST),
				createMenu("Travel", 5L, MenuType.LIST),
				createMenu("React", 3L, MenuType.LIST),
				createMenu("MAIN", 0L, MenuType.MAIN));

		mrepo.saveAll(menus);
	}

	@Test
	void createArticle() {
		arepo.saveAll(List.of(
				createArticle("test", new String[] { "test" }, "test"),
				createArticle("test2", new String[] { "test2" }, "test2"),
				createArticle("test3", new String[] { "test3" }, "test3"),
				createArticle("test4", new String[] { "test4" }, "test4"),
				createArticle("test5", new String[] { "test5" }, "test5"),
				createArticle("test6", new String[] { "test6" }, "test6"),
				createArticle("test7", new String[] { "test7" }, "test7"),
				createArticle("test8", new String[] { "test8" }, "test8"),
				createArticle("test9", new String[] { "test9" }, "test9"),
				createArticle("test10", new String[] { "test10" }, "test10"),
				createArticle("test11", new String[] { "test11" }, "test11"),
				createArticle("test12", new String[] { "test12" }, "test12"),
				createArticle("test13", new String[] { "test13" }, "test13"),
				createArticle("test14", new String[] { "test14" }, "test14"),
				createArticle("test15", new String[] { "test15" }, "test15")));

	}

	private Article createArticle(String title, String[] tags, String context) {
		return Article.builder()
				.title(title)
				.context(context)
				.tags(tags)
				.mekey(1L)
				.hide(false)
				.build();
	}

	private Menu createMenu(String menuname, Long parentmekey, MenuType type) {
		return Menu.builder()
				.mename(menuname)
				.parentmekey(parentmekey)
				.meorder(0)
				.hide(false)
				.icon(null)
				.type(type)
				.build();
	}

}
