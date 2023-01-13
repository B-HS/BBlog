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
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mid;
    private String email;
    private String password;
    private String nickname;
    private Boolean logged;
    private LocalDateTime joindate;

    @ElementCollection(fetch= FetchType.LAZY)
    private Role roles;

    @Builder.Default
    @OneToMany(mappedBy = "member", orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<Article> article = new LinkedHashSet<>();
    
    @Builder.Default
    @OneToMany(mappedBy = "member", orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<Reply> replies = new LinkedHashSet<>();

    public enum Role{
        ADMIN, USER
    }

}
