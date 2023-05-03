package dev.hyns.bblogbackend.Article;

import java.io.File;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;
import dev.hyns.bblogbackend.Article.Article.Menu;
import dev.hyns.bblogbackend.Article.Tag.Tag;
import dev.hyns.bblogbackend.Article.Tag.TagRepository;
import dev.hyns.bblogbackend.Article.Visit.VisitRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {
    @Value("${dev.hyns.filepath}")
    private String DIRADRESS;
    private final ArticleRepository arepo;
    private final TagRepository trepo;
    private final VisitRepository vrepo;

    @Override @Transactional
    public ResponseEntity<ArticleDTO> readArticle(Long num) {
        Article result = arepo.findById(num).orElseThrow(() -> new IllegalArgumentException("Article not exist"));
        System.out.println(result);
        ArticleDTO dto = toDTO(result);
        dto.setVisitCnt(vrepo.countByArticleAid(num).intValue());
        return new ResponseEntity<ArticleDTO>(dto, HttpStatus.OK);
    }

    @Override @Transactional
    public ResponseEntity<Long> writeArticle(ArticleDTO dto) {
        Article article = arepo.save(toEntity(dto));
        trepo.saveAll(dto.getTags().stream().map(v -> Tag.builder().tag(v).article(article).build()).collect(Collectors.toSet()));
        return new ResponseEntity<Long>(article.getAid(), HttpStatus.OK);
    }

    @Override @Transactional
    public ResponseEntity<Long> modifyArticle(ArticleDTO dto) {
        Article target = arepo.findById(dto.getAid()).orElseThrow(() -> new IllegalArgumentException("Article not exist"));
        target.updateArticle(dto);
        arepo.save(target);
        trepo.deleteAll(target.getTags());
        trepo.saveAll(dto.getTags().stream().map(v -> Tag.builder().tag(v).article(target).build()).collect(Collectors.toSet()));
        return new ResponseEntity<Long>(target.getAid(), HttpStatus.OK);
    }

    @Override @Transactional
    public ResponseEntity<Boolean> deleteArticle(Long num) {
        arepo.deleteById(num);
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    @Override @Transactional
    public ResponseEntity<HashMap<String, Object>> articleList(Menu menu, Integer page, Integer size) {
        HashMap<String, Object> result = new HashMap<>();
        if (menu == Menu.INTRO) {
            result.put("article", toDTO(arepo.findOneByMenuEqualsOrderByAidDesc(menu).orElseThrow(() -> new IllegalArgumentException("Article not exist"))));
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        Page<Article> entities;
        if (menu == Menu.ALL) {
            entities = arepo.findAllByMenuNotIn(PageRequest.of(page, size, Direction.DESC, "aid"), Set.of(Menu.PORTFOLIO, Menu.INTRO));
        } else {
            entities = arepo.findDistinctAllByMenu(PageRequest.of(page, size, Direction.DESC, "aid"), menu);
        }
        result.put("articles", entities.getContent().stream().map(v -> {
            ArticleDTO dto = toDTO(v);
            if (dto.getContext().replaceAll("<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>", "").length() > 100) {
                dto.setContext(dto.getContext().replaceAll("<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>", "").substring(0, 100));
            }
            return dto;
        }).toList());
        result.put("total", entities.getTotalPages());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public String ImgUpload(MultipartRequest files) {
        MultipartFile file = files.getFile("upload");
        String fileName = UUID.randomUUID().toString() + "." + FilenameUtils.getExtension(file.getOriginalFilename());
        try {
            file.transferTo(new File(DIRADRESS + fileName));
            return fileName;
        } catch (Exception e) {return "basic.png";}
    }

    @Override
    public List<Object> ImgRead(String filename) {
        List<Object> result = new ArrayList<>();
        try {
            File file = new File(DIRADRESS + File.separator + URLDecoder.decode(filename, "UTF-8"));
            if (file.exists()) {
                result.add(FileCopyUtils.copyToByteArray(file));
                result.add(Files.probeContentType(file.toPath()));
            }
        } catch (Exception e) {}
        return result;
    }
}
