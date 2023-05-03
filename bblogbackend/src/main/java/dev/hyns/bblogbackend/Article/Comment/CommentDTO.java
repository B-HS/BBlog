package dev.hyns.bblogbackend.Article.Comment;

import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CommentDTO {
    private Long rid;
    private String commentDesc;
    private String nickname;
    private String pw;
    private Long commentGroup;
    private Long commentSort;
    private String commentImg;
    private LocalDateTime uploadedDated;
    private Long aid;
    private int size;
    private int page;
}
