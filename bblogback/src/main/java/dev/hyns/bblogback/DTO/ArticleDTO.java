package dev.hyns.bblogback.DTO;

import java.util.List;

import dev.hyns.bblogback.Entity.ArticleImage;
import dev.hyns.bblogback.Entity.Menu;
import dev.hyns.bblogback.Entity.Reply;
import dev.hyns.bblogback.Entity.Visitor;
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
    private byte[] context;
    private boolean hide;
    private Menu menu;
    private List<Visitor> visitor;
    private List<Reply> reply;
    private List<ArticleImage> image;
}
