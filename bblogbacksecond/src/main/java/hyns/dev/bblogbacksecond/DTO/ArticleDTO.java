package hyns.dev.bblogbacksecond.DTO;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import hyns.dev.bblogbacksecond.Entity.Article.Menu;
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
    private LocalDateTime articleCreatedDate;
    private Menu menu;
    private Integer visitors;
    private Boolean hide;
    private List<String> imgs;
    private List<String> hashtag;
    private LocalDateTime start;
    private LocalDateTime end;
    private String github;
    private String published;
}
