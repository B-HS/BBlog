package dev.hyns.bblogback.Entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.Column;
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
public class Members extends DateEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mid;

    @Column(nullable = false)
    private boolean oauth;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String password;

    @OneToMany(mappedBy = "mid", fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Reply> reply = new ArrayList<>();

    @ElementCollection(fetch = FetchType.LAZY)
    @Column
    private Set<Roles> roles = new HashSet<>();

    @Column
    private String userimg;

    @Builder
    public Members(Long mid, Boolean oauth, String email, String nickname, String password, String userimg){
        this.email = email;
        this.password = password;
        this.oauth = oauth;
        this.mid = mid;
        this.nickname = nickname;
        this.userimg = userimg;
    }


}
