package net.gumyo.bblog.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.gumyo.bblog.service.user.UserService;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService user;

    @PostMapping("/user/list")
    public List<Map<String, Object>> getMenuList(@RequestBody(required = false) Map<String, Object> map) {
        return user.getUserList(map);
    }

    @PostMapping("/user/save")
    public ResponseEntity<Boolean> saveMenuList(@RequestBody List<Map<String, Object>> list) {
        user.saveUserList(list);
        return ResponseEntity.ok(true);
    }

}
