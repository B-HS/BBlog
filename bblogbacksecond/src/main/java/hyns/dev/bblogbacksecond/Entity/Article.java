package hyns.dev.bblogbacksecond.Entity;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
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
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long aid;
    private String title;
    private byte[] context;
    private LocalDateTime articleCreatedDate;
    
    @ElementCollection(fetch= FetchType.LAZY)
    private Menu menu;

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

    public enum Menu {
        intro, frontend, backend, etc, portfolio
    }

}
