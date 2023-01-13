package hyns.dev.bblogbacksecond.DTO;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonInclude;

import hyns.dev.bblogbacksecond.Entity.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ReplyDTO {
    private Long rid;
    private String context;
    private LocalDateTime replyCreatedDate;
    private Long aid;
    private Member member;
}
