package dev.hyns.bblogback.Service.MembersService;

import dev.hyns.bblogback.DTO.MembersDTO;
import dev.hyns.bblogback.Entity.Members;
import dev.hyns.bblogback.VO.MemberInfoForReply;

public interface MembersService {
    

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

    default MemberInfoForReply EntityToReplyMemberInfo(Members entity){
        MemberInfoForReply replyMember = MemberInfoForReply.builder()
        .email(entity.getEmail())
        .mid(entity.getMid())
        .nickname(entity.getNickname())
        .userimg(entity.getUserimg())
        .build();
        return replyMember;
    }

}
