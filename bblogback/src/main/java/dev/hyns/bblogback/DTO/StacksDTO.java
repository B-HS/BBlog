package dev.hyns.bblogback.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StacksDTO {
    private Long sid;
    private String title;
    private String context;
    private int idx;
}
