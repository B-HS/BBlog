package dev.hyns.bblogback.security.User;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BlogCustomUser extends User{
    private Long mid;
    private String email;
    private String password;
    private String nickname;
    private String token;

    public BlogCustomUser(String email, String password, Long mid, String nickname, Collection<? extends GrantedAuthority> authorities){
        super(email, password, authorities);
        this.email = email;
        this.password = password;
        this.mid = mid;
        this.nickname = nickname;
    }
}
