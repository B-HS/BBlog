package dev.hyns.bblogbackend.Article;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import dev.hyns.bblogbackend.Article.Comment.Comment;
import dev.hyns.bblogbackend.Article.Tag.Tag;
import dev.hyns.bblogbackend.Article.Visit.Visit;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long aid;
    @Column(columnDefinition = "LONGTEXT")
    private String title;
    @Column(columnDefinition = "LONGTEXT")
    private String context;
    @CreatedDate
    private LocalDateTime createdDate;
    @Column
    private LocalDateTime startDate;
    @Column
    private LocalDateTime endDate;
    @Column
    private Boolean hide;
    @Column
    private Menu menu;
    @Column(columnDefinition = "LONGTEXT")
    private String thumbnail;
    @Column(columnDefinition = "LONGTEXT")
    private String github;
    @Column(columnDefinition = "LONGTEXT")
    private String publish;
    @Builder.Default
    @OneToMany(mappedBy = "article", orphanRemoval = true)
    private Set<Comment> comments = new LinkedHashSet<>();
    @Builder.Default
    @OneToMany(mappedBy = "article", orphanRemoval = true)
    private Set<Tag> tags = new LinkedHashSet<>();
    @Builder.Default
    @OneToMany(mappedBy = "article", orphanRemoval = true)
    private Set<Visit> visits = new LinkedHashSet<>();

    public void updateArticle(ArticleDTO dto) {
        this.title = dto.getTitle();
        this.context = dto.getContext();
        this.hide = dto.getHide();
        this.menu = dto.getMenu();
    }
    public enum Menu { INTRO, DEV, ETC, PORTFOLIO, ALL }
}
