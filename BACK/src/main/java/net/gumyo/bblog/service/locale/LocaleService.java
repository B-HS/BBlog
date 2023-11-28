package net.gumyo.bblog.service.locale;

import java.util.List;
import java.util.Map;

public interface LocaleService {
    List<Map<String, Object>> getLocales();

    int saveLocales(List<Map<String, Object>> list);

    void deleteLocales(List<String> list);
}
