package dev.hyns.bblogbackend;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.IntStream;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import dev.hyns.bblogbackend.Article.Article.Menu;
import dev.hyns.bblogbackend.Article.ArticleDTO;
import dev.hyns.bblogbackend.Article.ArticleService;
import dev.hyns.bblogbackend.Security.SiteManager;
import dev.hyns.bblogbackend.Security.SiteManager.Role;
import dev.hyns.bblogbackend.Security.SiteManagerRepository;
@SpringBootTest
class BblogbackendApplicationTests {
	@Autowired
	SiteManagerRepository srepo;
	@Autowired
	ArticleService aser;
	@Autowired
	PasswordEncoder encoder;

	@Test
	void adminGenerate() {srepo.save(SiteManager.builder().adminId("hs").password(encoder.encode("bb24151122")).nickname("현석").roles(Set.of(Role.ADMIN)).img("default.png").build());}

	@Test
	void articleGenerate() {
		IntStream.range(0, 15).forEach(v -> {
			List<String> tags = new ArrayList<>();
			tags.add("123");
			tags.add("456");
			tags.add("789");
			aser.writeArticle(ArticleDTO.builder().title("test" + Integer.valueOf(v)).context("testtesttesttesttesttest").hide(false).menu(Menu.ETC).tags(tags).build());
		});
	
	}

}
