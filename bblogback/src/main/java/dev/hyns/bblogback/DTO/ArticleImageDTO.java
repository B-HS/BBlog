package dev.hyns.bblogback.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ArticleImageDTO {
    private Long imgid;
    private String fileName;
    private int idx;
    private Long articleid;
}
