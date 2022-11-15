package dev.hyns.bblogback.Service.ArticleService;

import java.io.File;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartRequest;

import dev.hyns.bblogback.DTO.ArticleDTO;
import dev.hyns.bblogback.Entity.Article;
import dev.hyns.bblogback.Entity.ArticleImage;
import dev.hyns.bblogback.Entity.Hashtag;
import dev.hyns.bblogback.Repository.ArticleImageRepository;
import dev.hyns.bblogback.Repository.ArticleRepository;
import dev.hyns.bblogback.Repository.HashtagRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {
    private final ArticleRepository arepo;
    private final ArticleImageRepository airepo;
    private final HashtagRepository hrepo;
    private final String DIRADRESS = "/Users/hyunseokbyun/Documents/Imagefiles/";

    @Override
    public List<Object> ImgRead(String filename) {
        List<Object> result = new ArrayList<>();
        try {
            File file = new File(DIRADRESS + File.separator + URLDecoder.decode(filename, "UTF-8"));
            if (file.exists()) {
                result.add(FileCopyUtils.copyToByteArray(file));
                result.add(Files.probeContentType(file.toPath()));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    @Override
    public String ImgUpload(MultipartRequest file) {
        List<String> result = new ArrayList<>();
        Optional.ofNullable(file.getFile("uploadimg")).ifPresent((img) -> {
            String fileName = UUID.randomUUID().toString() + "."
                    + FilenameUtils.getExtension(img.getOriginalFilename());
            try {
                img.transferTo(new File(DIRADRESS + fileName));
                result.add(fileName);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });

        return result.get(0);
    }

    @Transactional
    @Override
    public Long write(ArticleDTO dto) {
        Optional<List<String>> imgs = Optional.ofNullable(dto.getImage());
        Optional<List<String>> hashtags = Optional.ofNullable(dto.getHashtag());
        Long articleid = arepo.save(ArticleDTOtoEntity(dto)).getAid();

        imgs.ifPresent((images) -> {
            images.forEach((img) -> {
                airepo.save(
                        ArticleImage.builder().article(Article.builder().aid(articleid).build()).fileName(img).build());
            });
        });

        hashtags.ifPresent((hashs) -> {
            hashs.forEach((hash) -> {
                hrepo.save(Hashtag.builder().article(Article.builder().aid(articleid).build()).tagname(hash).build());
            });
        });

        return articleid;
    }

    @Override
    public ArticleDTO read(Long aid) {
        ArticleDTO dto = ArticleEntitytoDTO(
                arepo.findByIdEager(aid).orElseThrow(() -> new NoSuchElementException("Article is not found")));
        if (dto.isHide() == true) {
            return null;
        }
        return dto;
    }
}
