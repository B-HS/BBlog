package dev.hyns.bblogbackend.Security;

import java.util.Set;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SiteManager {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mid;
    @Column(unique = true)
    private String adminId;
    @Column
    private String password;
    @Column
    private String nickname;
    @Enumerated
    private Set<Role> roles;
    @Column(columnDefinition = "LONGTEXT")
    private String img;
    @Column(columnDefinition = "LONGTEXT")
    private String token;
    public void updateToken(String token){this.token = token;}
    public enum Role{ADMIN}
}
