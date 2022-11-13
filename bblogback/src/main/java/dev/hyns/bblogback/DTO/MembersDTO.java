package dev.hyns.bblogback.DTO;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MembersDTO {
    private Long mid;
    private boolean oauth;
    private String email;
    private String nickname;
    private String password;
    private String userimg;
    private LocalDateTime regdate;
}
