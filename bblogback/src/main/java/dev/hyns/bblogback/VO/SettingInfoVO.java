package dev.hyns.bblogback.VO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SettingInfoVO {
    private Long mid;
    private String pw;
    private String repw;
    private String changedNickname;
}
