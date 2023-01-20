package hyns.dev.bblogbacksecond.Service.ArticleService;

import java.util.HashMap;

import hyns.dev.bblogbacksecond.DTO.ArticleDTO;
import hyns.dev.bblogbacksecond.Entity.Article;
import hyns.dev.bblogbacksecond.Entity.ArticleHashtag;
import hyns.dev.bblogbacksecond.Entity.ArticleImage;
import hyns.dev.bblogbacksecond.Entity.Hashtag;
import hyns.dev.bblogbacksecond.Entity.Article.Menu;

public interface ArticleService {
    HashMap<String, Object> list(Menu menu, Integer page, Integer size);
    HashMap<String, Object> searchedList(String keywords, Integer page, Integer size);
    Long wrtie(ArticleDTO dto);
    ArticleDTO read(Long num);
    Long modify(ArticleDTO dto);
    Boolean delete(Long num);
    ArticleDTO intro();


    default Article toEntity(ArticleDTO dto){
        return Article.builder()
                        .aid(dto.getAid())
                        .title(dto.getTitle())
                        .context(dto.getContext())
                        .menu(dto.getMenu())
                        .start(dto.getStart())
                        .end(dto.getEnd())
                        .github(dto.getGithub())
                        .published(dto.getPublished())
                        .hide(dto.getHide())
                        .build();
    }

    default ArticleDTO toDTO(Article entity){
        return ArticleDTO.builder()
                        .aid(entity.getAid())
                        .title(entity.getTitle())
                        .context(entity.getContext())
                        .articleCreatedDate(entity.getArticleCreatedDate())
                        .menu(entity.getMenu())
                        .visitors(entity.getVisitors().size())
                        .hashtag(entity.getArtiHash().stream().map(v->v.getHashtag().getTagName()).toList())
                        .imgs(entity.getImgs().stream().map(v->v.getName()).toList())
                        .start(entity.getStart())
                        .end(entity.getEnd())
                        .github(entity.getGithub())
                        .published(entity.getPublished())
                        .build();
    }

    default ArticleImage toImageEntity(String name, Article article){
        return ArticleImage.builder().name(name).article(article).build();
    }
    default ArticleHashtag toHashEntity(Hashtag hashtag, Article article){
        return ArticleHashtag.builder().article(article).hashtag(hashtag).build();
    }
}
