package net.gumyo.bblog.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import net.gumyo.bblog.entity.User;
import net.gumyo.bblog.entity.User.Role;

public class UserDetail implements UserDetails {
    private User user;

    public UserDetail(User user) {
        this.user = user;
    }

    @Override
    public String getUsername() {
        return user.getUrname();
    }

    @Override
    public String getPassword() {
        return user.getPw();
    }

    @Override
    public boolean isEnabled() {

        return user.getIsDeleted() ? false : true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return user.getIsDisabled() ? false : true;
    }

    @Override
    public boolean isAccountNonExpired() {
        return user.getIsDisabled() ? false : true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String[] roles = user.getRoles().stream().map(Role::name).toArray(String[]::new);
        return AuthorityUtils.createAuthorityList(roles);
    }

}