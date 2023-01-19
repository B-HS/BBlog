package hyns.dev.bblogbacksecond.Security.DTO;

import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import hyns.dev.bblogbacksecond.Entity.Member;

public class GlobalDetails implements UserDetails, OAuth2User {
    private Member member;
    private Map<String, Object> attributes;

    public GlobalDetails(Member member) {
        this.member = member;
    }

    public GlobalDetails(Member member, Map<String, Object> attributes) {
        this.member = member;
        this.attributes = attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String[] memberRole = member.getRoles().stream().map(v -> v.name()).toArray(String[]::new);
        return AuthorityUtils.createAuthorityList(memberRole);
    }

    @Override
    public String getUsername() {
        return member.getEmail();
    }

    @Override
    public String getPassword() {
        return member.getPassword();
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public String getName() {
        return member.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        // 만료 사용안하니 바로 true
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // 계정잠금 사용안하니 true
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // 2차 비밀번호 등(혹은 이전 비밀번호)을 추가로 검증할 수단 만들면 로직 다시 짜기
        return true;
    }

    @Override
    public boolean isEnabled() {
        // 혹시 계정 활성화 사용할 것이라면 로직 다시 짜기
        return true;
    }
}
