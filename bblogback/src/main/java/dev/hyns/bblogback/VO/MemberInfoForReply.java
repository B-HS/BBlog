package dev.hyns.bblogback.VO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberInfoForReply {
    private Long mid;
    private String email;
    private String nickname;
    private String userimg;
}
