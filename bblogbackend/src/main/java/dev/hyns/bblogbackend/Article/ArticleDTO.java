package dev.hyns.bblogbackend.Article;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import dev.hyns.bblogbackend.Article.Article.Menu;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ArticleDTO {
    private Long aid;
    private String title;
    private String context;
    private LocalDateTime createdDate;
    private Boolean hide;
    private Menu menu;
    private List<String> tags;
    private int visitCnt;
    private int size;
    private int page;
    private String thumbnail;
    private String github;
    private String publish;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
