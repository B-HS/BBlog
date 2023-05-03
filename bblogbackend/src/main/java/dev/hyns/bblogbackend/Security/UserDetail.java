package dev.hyns.bblogbackend.Security;

import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

public class UserDetail implements UserDetails {
    private SiteManager manager;
    public UserDetail(SiteManager manager) {this.manager = manager;}
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {String[] managerRole = manager.getRoles().stream().map(v -> v.name()).toArray(String[]::new);return AuthorityUtils.createAuthorityList(managerRole);}
    @Override
    public String getUsername() {return manager.getAdminId();}
    @Override
    public String getPassword() {return manager.getPassword();}
    @Override
    public boolean isAccountNonExpired() {return true;}
    @Override
    public boolean isAccountNonLocked() {return true;}
    @Override
    public boolean isCredentialsNonExpired() {return true;}
    @Override
    public boolean isEnabled() {return true;}
}
