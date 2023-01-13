package hyns.dev.bblogbacksecond.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hid;
    private String tagName;
    

    @OneToMany(mappedBy = "hashtag", orphanRemoval = true)
    private ArticleHashtag ahid;

}
