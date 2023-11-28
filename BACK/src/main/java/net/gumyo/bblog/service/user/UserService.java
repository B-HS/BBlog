package net.gumyo.bblog.service.user;

import java.util.List;
import java.util.Map;

public interface UserService {
    List<Map<String, Object>> getUserList(Map<String, Object> map);

    void saveUserList(List<Map<String, Object>> list);
}
