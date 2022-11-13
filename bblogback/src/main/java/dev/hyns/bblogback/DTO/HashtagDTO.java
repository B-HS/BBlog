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
public class HashtagDTO {
    private Long hid;
    private String tagname;
    private Article article;
}
