package dev.hyns.bblogback.security.User;

import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.core.user.OAuth2User;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class BlogOAuthUser extends User implements OAuth2User {

    private Long mid;
    private String email;
    private String password;
    private String nickname;
    private String token;

    public BlogOAuthUser(String email, String password, Long mid, String nickname, Collection<? extends GrantedAuthority> authorities){
        super(email, password, authorities);
        this.email = email;
        this.password = password;
        this.mid = mid;
        this.nickname = nickname;
    }

    @Override
    public String getName() {
        return this.nickname;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return null;
    }
}
