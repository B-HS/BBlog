package dev.hyns.bblogback.Service.ArticleService;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.stereotype.Service;

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
        ArticleDTO dto = ArticleEntitytoDTO(arepo.findByIdEager(aid).orElseThrow(() -> new NoSuchElementException("Article is not found")));
        if(dto.isHide()==true){
            return null;
        }
        return dto;
    }
}
