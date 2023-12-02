package net.gumyo.bblog.service.menu;

import java.util.List;
import java.util.Map;

public interface MenuService {
    List<Map<String, Object>> getMenuList(Map<String, Object> map);

    void saveMenuList(List<Map<String, Object>> list);
}
