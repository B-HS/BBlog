package dev.hyns.bblogback.security.Service;

import java.util.NoSuchElementException;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import dev.hyns.bblogback.Entity.Members;
import dev.hyns.bblogback.Repository.MembersRepository;
import dev.hyns.bblogback.security.User.BlogCustomUser;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RequiredArgsConstructor
@Service
@Log4j2
public class BlogUserDetailsService implements UserDetailsService{
    private final MembersRepository mrepo;
    @Transactional
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        log.info("UserDetailsService called");
        Members member = mrepo.findByEmail(email).orElseThrow(()->new NoSuchElementException());
        return new BlogCustomUser(member.getEmail(), member.getPassword(), member.getMid(), member.getNickname(), member.getRoles().stream().map(role-> new SimpleGrantedAuthority(role.name())).toList());
    }    
}
