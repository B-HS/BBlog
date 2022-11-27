package dev.hyns.bblogback.security.Service;


import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import dev.hyns.bblogback.Entity.Members;
import dev.hyns.bblogback.Entity.Roles;
import dev.hyns.bblogback.Repository.MembersRepository;
import dev.hyns.bblogback.security.User.BlogOAuthUser;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class BlogOauthService extends DefaultOAuth2UserService {
    private final MembersRepository mrepo;
    private final PasswordEncoder pEncoder;
    Members member;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User userinfo = super.loadUser(userRequest);
        mrepo.findByEmail(userinfo.getAttribute("email")).ifPresentOrElse(
                (v) -> member = v,
                () -> member = mrepo.save(Members.builder()
                        .email(userinfo.getAttribute("email"))
                        .nickname("THISUSERNICKNAMEISNOTDEFINED")
                        .password(pEncoder.encode("THISPASSWORDISINITPASSWORD"))
                        .userimg(userinfo.getAttribute("picture"))
                        .oauth(true)
                        .roles(Roles.ROLE_USER)
                        .build()));

                        
        return new BlogOAuthUser(member.getEmail(), member.getPassword(), member.getMid(), member.getNickname(),
                member.getRoles().stream().map(v -> new SimpleGrantedAuthority(v.name())).toList());
    }

}