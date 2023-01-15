package hyns.dev.bblogbacksecond.Entity;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
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

    @Column
    private String title;

    @Column(columnDefinition = "LONGTEXT")
    private String context;

    @Column(updatable = false)
    @CreatedDate
    private LocalDateTime articleCreatedDate;

    @Enumerated(EnumType.STRING)
    private Menu menu;

    @Column
    private Boolean hide;

    @Builder.Default
    @OneToMany(mappedBy = "article", orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("rid asc")
    private Set<Reply> replies = new LinkedHashSet<>();

    @Builder.Default
    @OneToMany(mappedBy = "article", orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("ahid asc")
    private Set<ArticleHashtag> artiHash = new LinkedHashSet<>();

    @Builder.Default
    @OneToMany(mappedBy = "article", orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("vid asc")
    private Set<Visitor> visitors = new LinkedHashSet<>();

    @Builder.Default
    @OneToMany(mappedBy = "article", orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("iid asc")
    private Set<ArticleImage> imgs = new LinkedHashSet<>();


    public enum Menu {
        INTRO, FRONTEND, BACKEND, ETC, PORTFOLIO
    }
}
