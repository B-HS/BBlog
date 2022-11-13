package dev.hyns.bblogback.DTO;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ArticleDTO {
    private Long aid;
    private String title;
    private String context;
    private boolean hide;
    private Long menuid;
    private int visitor;
    private List<ReplyDTO> reply;
    private List<String> image;
    private List<String> hashtag;
    private LocalDateTime regdate;

}
