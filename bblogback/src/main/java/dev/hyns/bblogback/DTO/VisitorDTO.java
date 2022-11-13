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
public class VisitorDTO {
    private Long vid;
    private String ipAdress;
    private String prevLink;
    private Long articleid;
    private LocalDateTime regdate;
}
