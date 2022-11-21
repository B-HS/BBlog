package dev.hyns.bblogback.Service.MembersService;

import dev.hyns.bblogback.DTO.MembersDTO;
import dev.hyns.bblogback.Entity.Members;

public interface MembersService {
    Boolean register(MembersDTO dto);

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
        .build();
        return entity;
    }

}
