package hyns.dev.bblogbacksecond.Security.Service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import hyns.dev.bblogbacksecond.Entity.Member;
import hyns.dev.bblogbacksecond.Repository.MemberRepository;
import hyns.dev.bblogbacksecond.Security.DTO.GlobalDetails;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final MemberRepository mrepo;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Member member = mrepo.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return new GlobalDetails(member);
    }
}
