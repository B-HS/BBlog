package dev.hyns.bblogback.Service.MembersService;

import dev.hyns.bblogback.DTO.MembersDTO;
import dev.hyns.bblogback.Entity.Members;
import dev.hyns.bblogback.Entity.Roles;
import dev.hyns.bblogback.VO.DropboxInfoVO;
import dev.hyns.bblogback.VO.SettingInfoVO;

public interface MembersService {
    Boolean register(MembersDTO dto);
    Boolean emaildupcheck(String email);
    Boolean nicknameChange(SettingInfoVO vo);
    Boolean declaration(SettingInfoVO vo);
    Boolean restOauthInfoDefining(SettingInfoVO vo);
    Boolean oauthinitcheck(SettingInfoVO vo);
    DropboxInfoVO dropboxInfo(Long mid);

    default MembersDTO MemberEntityToDTO(Members entity){
        MembersDTO dto = MembersDTO.builder()
        .email(entity.getEmail())
        .oauth(entity.isOauth())
        .mid(entity.getMid())
        .nickname(entity.getNickname())
        .userimg(entity.getUserimg())
        .build();
        return dto;
    }

    default Members MemberDTOtoEntity(MembersDTO dto){
        Members entity = Members.builder()
        .email(dto.getEmail())
        .password(dto.getPassword())
        .oauth(dto.isOauth())
        .mid(dto.getMid())
        .nickname(dto.getNickname())
        .userimg("basic.png")
        .logged(false)
        .roles(Roles.ROLE_USER)
        .build();
        return entity;
    }

}
