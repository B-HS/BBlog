package net.gumyo.bblog.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.gumyo.bblog.service.menu.MenuService;

@RestController
@RequiredArgsConstructor
public class MenuController {

    private final MenuService mser;

    @PostMapping("/menus/list")
    public List<Map<String, Object>> getMenuList(@RequestBody(required = false) Map<String, Object> map) {
        return mser.getMenuList(map);
    }

    @PostMapping("/menus/save")
    public ResponseEntity<Boolean> saveMenuList(@RequestBody List<Map<String, Object>> list) {
        mser.saveMenuList(list);
        return ResponseEntity.ok(true);
    }

}
