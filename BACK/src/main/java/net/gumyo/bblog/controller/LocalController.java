package net.gumyo.bblog.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.gumyo.bblog.service.locale.LocaleService;

@RestController
@RequiredArgsConstructor
public class LocalController {
    private final LocaleService lser;

    @PostMapping("/locale")
    public List<Map<String, Object>> getLocaleListByRokey() {
        return lser.getLocales();
    }

    @PostMapping("/locale/save")
    public int saveLocales(@RequestBody List<Map<String, Object>> list) {
        return lser.saveLocales(list);
    }

    @PostMapping("/locale/delete")
    public void deleteLocales(@RequestBody List<String> list) {
        lser.deleteLocales(list);
    }
}
