package dev.hyns.bblogback.Service.MembersService;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import dev.hyns.bblogback.DTO.MembersDTO;
import dev.hyns.bblogback.Repository.MembersRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MembeersServiceImpl implements MembersService{
    private final MembersRepository mrepo;
    private final PasswordEncoder pEncoder;
    
    @Override
    public Boolean register(MembersDTO dto) {
        if(dto.getEmail().length()!=0){
            dto.setPassword(pEncoder.encode(dto.getPassword()));
            mrepo.save(MemberDTOtoEntity(dto));
            return true;
        }
        return false;
    }
}
