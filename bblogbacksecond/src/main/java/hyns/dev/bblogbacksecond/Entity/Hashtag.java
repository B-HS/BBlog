package hyns.dev.bblogbacksecond.Entity;

import java.util.LinkedHashSet;
import java.util.Set;

import jakarta.persistence.Entity;
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
public class Hashtag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hid;

    private String tagName;
    

    @OneToMany(mappedBy = "hashtag", orphanRemoval = true)
    @Builder.Default
    private Set<ArticleHashtag> ahid = new LinkedHashSet<>();

}
