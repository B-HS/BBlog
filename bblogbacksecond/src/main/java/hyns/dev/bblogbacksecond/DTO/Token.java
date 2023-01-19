package hyns.dev.bblogbacksecond.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Token {
    private String access;
    private String refresh;
}
