package net.gumyo.bblog.service.user;

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import net.gumyo.bblog.entity.User;
import net.gumyo.bblog.entity.User.Role;
import net.gumyo.bblog.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository urepo;
    private ObjectMapper objectMapper = new ObjectMapper();
    private PasswordEncoder passwordEncoder;

    @Override
    public List<Map<String, Object>> getUserList(Map<String, Object> map) {
        return urepo.findAll().stream()
                .map(val -> objectMapper.convertValue(val.getLoginInfo(), new TypeReference<Map<String, Object>>() {
                })).toList();

    }

    @Override
    public void saveUserList(List<Map<String, Object>> list) {
        list.forEach(val -> {
            if ("I".equals(val.get("row_status"))) {
                User user = urepo.save(User
                        .builder()
                        .urname(val.get("urname").toString())
                        .urnickname(val.get("urnickname").toString())
                        .email(val.get("email").toString())
                        .pw(passwordEncoder.encode(val.get("pw").toString()))
                        .isAuthed(true)
                        .isDisabled(false)
                        .isLogged(false)
                        .introduce("HELLO!")
                        .isDeleted(false)
                        .roles(Set.of(Role.USER))
                        .build());
                urepo.save(user);

            } else if ("U".equals(val.get("row_status"))) {
                val.remove("row_status");
                urepo.save(objectMapper.convertValue(val, User.class));
            } else if ("D".equals(val.get("row_status"))) {
                urepo.deleteById(Integer.parseInt(val.get("urkey").toString()));
            }
        });

    }

}
