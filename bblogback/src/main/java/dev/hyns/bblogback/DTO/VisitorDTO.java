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
public class VisitorDTO {
    private Long vid;
    private String ipAdress;
    private String prevLink;
    private Article article;
}
