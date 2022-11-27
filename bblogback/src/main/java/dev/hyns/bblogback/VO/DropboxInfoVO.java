package dev.hyns.bblogback.VO;

import dev.hyns.bblogback.Repository.MembersRepository.getDropboxInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DropboxInfoVO {
    private Long mid;
    private String picture;
    private String nickname;
    private Integer replyCount;

    public DropboxInfoVO(getDropboxInfo info) {
        this.mid = info.getMid();
        this.picture = info.getPicture();
        this.nickname = info.getNickname();
        this.replyCount = info.getReplyCount();
    }
}

