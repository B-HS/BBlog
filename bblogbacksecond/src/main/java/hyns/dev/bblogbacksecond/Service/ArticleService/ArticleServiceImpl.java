package hyns.dev.bblogbacksecond.Service.ArticleService;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import hyns.dev.bblogbacksecond.DTO.ArticleDTO;
import hyns.dev.bblogbacksecond.Entity.Article;
import hyns.dev.bblogbacksecond.Entity.ArticleHashtag;
import hyns.dev.bblogbacksecond.Entity.ArticleImage;
import hyns.dev.bblogbacksecond.Entity.Hashtag;
import hyns.dev.bblogbacksecond.Entity.Article.Menu;
import hyns.dev.bblogbacksecond.Repository.ArticleHashtagRepository;
import hyns.dev.bblogbacksecond.Repository.ArticleRepository;
import hyns.dev.bblogbacksecond.Repository.HashtagRepository;
import hyns.dev.bblogbacksecond.Repository.ImageRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {
    private final ArticleRepository arepo;
    private final ImageRepository irepo;
    private final ArticleHashtagRepository ahrepo;
    private final HashtagRepository hrepo;

    @Override
    public HashMap<String, Object> list(Menu menu, Integer page, Integer size) {
        HashMap<String, Object> result = new HashMap<>();
        Page<Article> entities = arepo.findDistinctAllByMenu(PageRequest.of(page, size, Direction.DESC, "aid"), menu);
        result.put("articles", entities.getContent().stream().map(v -> toDTO(v)).toList());
        result.put("total", entities.getTotalPages());
        return result;
    }

    @Override
    public Long wrtie(ArticleDTO dto) {
        Article article = arepo.save(toEntity(dto));

        hrepo.findAllByTagNameIn(dto.getHashtag()).ifPresent(taglist -> {
            List<String> tagsString = taglist.stream().map(v -> v.getTagName()).toList();
            List<Hashtag> newtags = dto.getHashtag().stream().filter(v -> !tagsString.contains(v))
                    .map(v -> hrepo.save(Hashtag.builder().tagName(v).build())).toList();
            taglist.addAll(newtags);
            ahrepo.saveAll(taglist.stream().map(v -> toHashEntity(v, article)).toList());
        });

        Optional.ofNullable(dto.getImgs()).ifPresent(images -> {
            irepo.saveAll(images.stream().map(v -> toImageEntity(v, article)).toList());
        });

        return article.getAid();
    }

    @Override
    public ArticleDTO read(Long num) {
        return toDTO(arepo.findByAid(num));
    }

    @Override
    public Long modify(ArticleDTO dto) {
        Article proto = arepo.findByAid(dto.getAid());
        Set<ArticleImage> imgs = proto.getImgs();
        List<String> imgsName = imgs.stream().map(v -> v.getName()).toList();
        List<ArticleImage> deletedImg = imgs.stream().filter(v -> !dto.getImgs().contains(v.getName())).toList();
        List<ArticleImage> saveImg = dto.getImgs().stream().filter(v -> imgsName.contains(v))
                .map(v -> ArticleImage.builder().name(v).article(proto).build()).toList();

        Set<ArticleHashtag> artihash = proto.getArtiHash();
        ;
        List<String> hashtag = artihash.stream().map(v -> v.getHashtag().getTagName()).toList();
        List<ArticleHashtag> deletedHash = artihash.stream()
                .filter(v -> !dto.getHashtag().contains(v.getHashtag().getTagName())).toList();
        List<ArticleHashtag> saveHash = dto.getHashtag().stream().filter(v -> hashtag.contains(v))
                .map(tags -> toHashEntity(hrepo.save(Hashtag.builder().tagName(tags).build()), proto)).toList();

        irepo.deleteAll(deletedImg);
        irepo.saveAll(saveImg);
        ahrepo.deleteAll(deletedHash);
        ahrepo.saveAll(saveHash);
        return arepo.save(toEntity(dto)).getAid();
    }

    @Override
    public Boolean delete(Long num) {
        try {
            arepo.deleteById(num);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
