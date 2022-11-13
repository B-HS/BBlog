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
public class HashtagDTO {
    private Long hid;
    private String tagname;
    private Long articleid;
    private LocalDateTime regdate;
}
