package dev.hyns.bblogback.Service.BlogService;

import java.util.HashMap;
import java.util.List;

import org.springframework.data.domain.Pageable;

import dev.hyns.bblogback.DTO.MenuDTO;
import dev.hyns.bblogback.DTO.VisitorDTO;
import dev.hyns.bblogback.Entity.Menu;
import dev.hyns.bblogback.VO.TodayAndTotal;


public interface BlogService {
    List<MenuDTO> getMenuList();
    HashMap<String, Object> getArticleListByMenuId(Pageable pageable, Long lid);
    void VisitorCheck(VisitorDTO dto);
    TodayAndTotal getToday();


    default MenuDTO menuEntityToDTO(Menu entity){
        MenuDTO dto = MenuDTO.builder()
        .lid(entity.getLid())
        .menuName(entity.getMenuName())
        .build();
        return dto;
    }
}
