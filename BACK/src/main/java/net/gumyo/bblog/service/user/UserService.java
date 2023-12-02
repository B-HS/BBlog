package net.gumyo.bblog.service.user;

import java.util.List;
import java.util.Map;

public interface UserService {
    Map<String, Object> getUserInfo(Integer urkey);

    List<Map<String, Object>> getUserList(Map<String, Object> map);

    void saveUserList(List<Map<String, Object>> list);
}
