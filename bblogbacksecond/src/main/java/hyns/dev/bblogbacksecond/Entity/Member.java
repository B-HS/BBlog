package hyns.dev.bblogbacksecond.Entity;

import java.util.LinkedHashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

    @Column(unique = true)
    private String email;
    
    @Column
    private String password;
    
    @Column
    private String nickname;

    @Column
    private Boolean logged;

    @Enumerated(EnumType.STRING)
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
