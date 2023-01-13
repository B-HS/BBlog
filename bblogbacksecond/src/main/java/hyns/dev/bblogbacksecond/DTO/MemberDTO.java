package hyns.dev.bblogbacksecond.DTO;

import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MemberDTO {
    private Long mid;
    private String email;
    private String password;
    private String nickname;
    private LocalDateTime joindate;
    private ArticleDTO article;
    private ReplyDTO reply;
    
}
