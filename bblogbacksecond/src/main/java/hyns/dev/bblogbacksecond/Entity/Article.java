package hyns.dev.bblogbacksecond.Entity;

import java.nio.charset.Charset;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.data.annotation.CreatedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
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

    @Column
    private String title;

    @Column
    @Lob
    private byte[] context;

    @Column(updatable = false)
    @CreatedDate
    private LocalDateTime articleCreatedDate;

    @Enumerated(EnumType.STRING)
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
        INTRO, FRONTEND, BACKEND, ETC, PORTFOLIO
    }

    public String updateContextToString(byte[] byteString){
        return new String(byteString, Charset.forName("utf8"));
    }
    
}
