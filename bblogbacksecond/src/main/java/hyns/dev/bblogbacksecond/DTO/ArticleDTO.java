package hyns.dev.bblogbacksecond.DTO;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import hyns.dev.bblogbacksecond.Entity.Article.Menu;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ArticleDTO {
    private Long aid;
    private String title;
    private byte[] context;
    private LocalDateTime articleCreatedDate;
    private Menu menu;
    private List<ReplyDTO> replies = new ArrayList<>();
    private List<HashtagDTO> artiHash = new ArrayList<>();
    private List<VisitorDTO> visitors = new ArrayList<>();
}
