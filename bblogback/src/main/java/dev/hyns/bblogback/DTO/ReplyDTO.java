package dev.hyns.bblogback.DTO;

import dev.hyns.bblogback.Entity.Article;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReplyDTO {
    private Long rid;
    private String context;
    private Long replyGroup;
    private Long replySort;
    private Article article;
}
