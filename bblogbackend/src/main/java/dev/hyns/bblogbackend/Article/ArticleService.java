package dev.hyns.bblogbackend.Article;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartRequest;
import dev.hyns.bblogbackend.Article.Article.Menu;
import dev.hyns.bblogbackend.Article.Tag.Tag;
public interface ArticleService {
    ResponseEntity<ArticleDTO> readArticle(Long num);
    ResponseEntity<Long> writeArticle(ArticleDTO dto);
    ResponseEntity<Long> modifyArticle(ArticleDTO dto);
    ResponseEntity<Boolean> deleteArticle(Long num);
    ResponseEntity<HashMap<String, Object>> articleList(Menu menu, Integer page, Integer size);
    String ImgUpload(MultipartRequest files);
    List<Object> ImgRead(String name);
    default ArticleDTO toDTO(Article entity) {return ArticleDTO.builder().aid(entity.getAid()).title(entity.getTitle()).context(entity.getContext()).createdDate(entity.getCreatedDate()).hide(entity.getHide()).menu(entity.getMenu()).tags(entity.getTags().stream().map(v -> v.getTag()).toList()).visitCnt(entity.getVisits().size()).thumbnail(entity.getThumbnail()).github(entity.getGithub()).publish(entity.getPublish()).startDate(entity.getStartDate()).endDate(entity.getStartDate()).build();}
    default Article toEntity(ArticleDTO dto) {return Article.builder().aid(dto.getAid()).title(dto.getTitle()).context(dto.getContext()).hide(dto.getHide()).menu(dto.getMenu()).tags(dto.getTags().stream().map(v -> Tag.builder().article(Article.builder().aid(dto.getAid()).build()).build()).collect(Collectors.toSet())).thumbnail(dto.getThumbnail()).github(dto.getGithub()).publish(dto.getPublish()).startDate(dto.getStartDate()).endDate(dto.getEndDate()).build();}
}
