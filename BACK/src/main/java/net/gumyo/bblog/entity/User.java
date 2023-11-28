package net.gumyo.bblog.entity;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

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

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer urkey;

    @Column
    private String urname;

    @Column(unique = true)
    private String urnickname;

    @Column(unique = true)
    private String email;

    @Column
    private String pw;

    @Column
    private Boolean isAuthed;

    @Column
    private Boolean isDisabled;

    @Column
    private Boolean isDeleted;

    @Column
    private Boolean isLogged;

    @Column
    private String introduce;

    @Column
    @CreatedDate
    private String insertDate;

    @Column
    @LastModifiedDate
    private String lastLogin;

    @Enumerated
    private Set<Role> roles;

    public enum Role {
        ADMIN, USER
    }

    public void updateLoginStatus(Boolean logged) {
        this.isLogged = logged;
    }

    public Map<String, Object> getLoginInfo() {
        Map<String, Object> user = new LinkedHashMap<>();
        user.put("urkey", urkey);
        user.put("email", email);
        user.put("urname", urname);
        user.put("nickname", urnickname);
        user.put("introduce", introduce);
        user.put("lastLogin", lastLogin);
        user.put("roles", roles);
        return user;
    }

}