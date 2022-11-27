package dev.hyns.bblogback.Service.MembersService;

import java.util.NoSuchElementException;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import dev.hyns.bblogback.DTO.MembersDTO;
import dev.hyns.bblogback.Entity.Members;
import dev.hyns.bblogback.Repository.MembersRepository;
import dev.hyns.bblogback.VO.DropboxInfoVO;
import dev.hyns.bblogback.VO.SettingInfoVO;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MembersServiceImpl implements MembersService{
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

    @Override
    public Boolean emaildupcheck(String email) {
        return mrepo.existsByEmail(email);
    }

    @Override
    @Transactional
    public Boolean nicknameChange(SettingInfoVO vo) {
        if(pEncoder.matches(vo.getPw(), mrepo.findById(vo.getMid()).orElseThrow(()-> new NoSuchElementException("없음")).getPassword())){
            mrepo.updateNicname(vo.getMid(), vo.getChangedNickname());
            return true;
        }else{
            return false;
        }
    }

    @Override
    @Transactional
    public Boolean restOauthInfoDefining(SettingInfoVO vo) {
        Members targetMember = mrepo.findById(vo.getMid()).orElse(null);
        if(targetMember.getNickname().equals("THISUSERNICKNAMEISNOTDEFINED")&&pEncoder.matches("THISPASSWORDISINITPASSWORD",targetMember.getPassword())){
            mrepo.updateNicnameAndPasswd(vo.getMid(), vo.getChangedNickname(), pEncoder.encode(vo.getPw()));
            return true;
        }
        return false;
    }

    @Override
    @Transactional
    public Boolean declaration(SettingInfoVO vo) {
        Members targetMember = mrepo.findById(vo.getMid()).orElse(null);
        if(pEncoder.matches(vo.getPw(), targetMember.getPassword()) && pEncoder.matches(vo.getRepw(), targetMember.getPassword())){
            mrepo.delete(targetMember);
            return true;
        }
        return false;
    }

    @Override
    public Boolean oauthinitcheck(SettingInfoVO vo) {
        Members targetMember = mrepo.findById(vo.getMid()).orElse(null);
        if(targetMember.getNickname().equals("THISUSERNICKNAMEISNOTDEFINED")&&pEncoder.matches("THISPASSWORDISINITPASSWORD",targetMember.getPassword())){
            return true;
        }
        return false;
    }

    @Override
    public DropboxInfoVO dropboxInfo(Long mid) {
        DropboxInfoVO result = new DropboxInfoVO(mrepo.dropboxInfo(mid));
        return result;
    }
}
