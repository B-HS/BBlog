package hyns.dev.bblogbacksecond.DTO;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
public class ReplyDTO {
    private Long rid;
    private String context;
    private String guestName;
    private String guestPassword;
    private Boolean hide;
    private LocalDateTime replyCreatedDate;
    private MemberDTO member;
    private Long aid;
    private Long replyGroup;
    private Long replySort;
}
