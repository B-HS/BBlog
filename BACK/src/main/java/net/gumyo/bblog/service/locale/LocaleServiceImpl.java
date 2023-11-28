package net.gumyo.bblog.service.locale;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import net.gumyo.bblog.entity.Locale;
import net.gumyo.bblog.repository.LocaleRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class LocaleServiceImpl implements LocaleService {
    private final LocaleRepository localeRepository;
    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public List<Map<String, Object>> getLocales() {
        return localeRepository.findAll().stream()
                .map(val -> objectMapper.convertValue(val, new TypeReference<Map<String, Object>>() {
                })).toList();
    }

    @Override
    public int saveLocales(List<Map<String, Object>> list) {
        if (list.size() > 0) {
            return localeRepository
                    .saveAll(list.stream().map(locale -> objectMapper.convertValue(locale, Locale.class)).toList())
                    .size();
        }

        return 0;
    }

    @Override
    public void deleteLocales(List<String> list) {
        localeRepository.deleteAll(localeRepository.findAllById(list));
    }

}
