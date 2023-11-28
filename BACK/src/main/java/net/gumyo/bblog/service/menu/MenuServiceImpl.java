package net.gumyo.bblog.service.menu;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import net.gumyo.bblog.entity.Menu;
import net.gumyo.bblog.repository.MenuRepository;
import net.gumyo.bblog.repository.RoleByUserRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class MenuServiceImpl implements MenuService {
    private final RoleByUserRepository rburepo;
    private final MenuRepository mrepo;
    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public List<Map<String, Object>> menuListByUrkey(Integer urkey) {
        Long[] roles = rburepo.findByPkUrkey(urkey).stream().map(val -> val.getPk().getRokey()).toArray(Long[]::new);
        return mrepo.getMenuByUserRole(roles).stream()
                .map(val -> objectMapper.convertValue(val, new TypeReference<Map<String, Object>>() {
                })).toList();
    }

    @Override
    public List<Map<String, Object>> getMenuList(Map<String, Object> map) {
        return mrepo.findAll().stream()
                .map(val -> objectMapper.convertValue(val, new TypeReference<Map<String, Object>>() {
                })).toList();
    }

    @Override
    public void saveMenuList(List<Map<String, Object>> list) {
        // TODO map> deleteALL 로 수정 필요
        list.forEach(val -> {
            if ("I".equals(val.get("row_status")) || "U".equals(val.get("row_status"))) {
                val.remove("row_status");
                mrepo.save(objectMapper.convertValue(val, Menu.class));
            } else if ("D".equals(val.get("row_status"))) {
                mrepo.deleteById(Long.parseLong(val.get("mekey").toString()));
            }
        });
    }
}
