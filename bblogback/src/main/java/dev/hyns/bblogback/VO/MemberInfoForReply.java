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
    private String replypwd;
    //그냥 멤버에 생성자 하나 만들면 끝이지만 하나하나 적기가 너무 귀찮음, 롬복 사랑해요
}
