package dev.hyns.bblogback.VO;

import java.util.List;

import dev.hyns.bblogback.DTO.StacksDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StackInfoVO {
    private List<StacksDTO> dtoList;
    private List<Long> deleteList;
}
