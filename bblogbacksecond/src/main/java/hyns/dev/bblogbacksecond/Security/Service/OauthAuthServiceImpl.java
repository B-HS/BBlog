package hyns.dev.bblogbacksecond.Security.Service;

import java.util.Set;
import java.util.UUID;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import hyns.dev.bblogbacksecond.Entity.Member;
import hyns.dev.bblogbacksecond.Entity.Member.Role;
import hyns.dev.bblogbacksecond.Repository.MemberRepository;
import hyns.dev.bblogbacksecond.Security.DTO.GlobalDetails;
import hyns.dev.bblogbacksecond.Security.Vender.OAuthAttributes;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
@Transactional
public class OauthAuthServiceImpl extends DefaultOAuth2UserService {
    private final MemberRepository mrepo;

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User user = super.loadUser(userRequest);
        String venderName = userRequest.getClientRegistration().getRegistrationId();
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint()
                .getUserNameAttributeName();
        OAuthAttributes userInfoByVender = OAuthAttributes.of(venderName, userNameAttributeName, user.getAttributes());
        Member member = saveOrUpdate(userInfoByVender);
        return new GlobalDetails(member, userInfoByVender.getAttributes());
    }

    @Transactional
    private Member saveOrUpdate(OAuthAttributes userInfoByVender) {
        Member member = mrepo.findByEmail(userInfoByVender.getEmail())
                .orElse(Member
                        .builder()
                        .email(userInfoByVender.getEmail())
                        .nickname("Google ::"+userInfoByVender.getEmail().substring(0, 3)+"...")
                        .password(UUID.randomUUID().toString())
                        .image(userInfoByVender.getPicture())
                        .roles(Set.of(Role.OAUTH))
                        .build());
        return mrepo.save(member);
    }
}
