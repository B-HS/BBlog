package hyns.dev.bblogbacksecond.Service.ArticleService;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

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
import hyns.dev.bblogbacksecond.Repository.ArticleRepository.articleCountByMenu;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {
    private final ArticleRepository arepo;
    private final ImageRepository irepo;
    private final ArticleHashtagRepository ahrepo;
    private final HashtagRepository hrepo;

    @Override
    @Transactional
    public HashMap<String, Object> list(Menu menu, Integer page, Integer size) {
        HashMap<String, Object> result = new HashMap<>();
        Page<Article> entities = arepo.findDistinctAllByMenu(PageRequest.of(page, size, Direction.DESC, "aid"), menu);
        result.put("articles", entities.getContent().stream().map(v -> {
            ArticleDTO dto =toDTO(v);
            if(dto.getContext().length()>225){
                dto.setContext(dto.getContext().replaceAll("<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>", "").substring(0, 225));
            }
            return dto;
        }).toList());
            
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
    @Transactional
    public ArticleDTO read(Long num) {
        return toDTO(arepo.findByAid(num));
    }

    @Override
    @Transactional
    public Long modify(ArticleDTO dto) {
        Article proto = arepo.findByAid(dto.getAid());

        Set<ArticleImage> imgs = proto.getImgs();
        List<String> imgsName = imgs.stream().map(v -> v.getName()).toList();
        List<String> deletedImg = imgsName.stream().filter(v -> {
            return !dto.getImgs().contains(v);
        }).toList();
        irepo.deleteAllByNameIn(deletedImg);
        List<String> savedImg = dto.getImgs().stream().filter(v -> !imgsName.contains(v)).toList();
        irepo.saveAll(savedImg.stream().map(v -> ArticleImage.builder().name(v).article(proto).build()).toList());

        Set<ArticleHashtag> protoartitags = proto.getArtiHash();
        List<String> listofTags = protoartitags.stream().map(v->v.getHashtag().getTagName()).toList();
        List<ArticleHashtag> deletedTags = protoartitags.stream().filter(v->!dto.getHashtag().contains(v.getHashtag().getTagName())).toList();
        ahrepo.deleteAllInBatch(deletedTags);
        List<String> savedTagnames = dto.getHashtag().stream().filter(v-> !listofTags.contains(v)).toList();

        Set<Hashtag> savedTags = savedTagnames.stream().map(v->{
            return hrepo.findByTagName(v).orElseGet(()->hrepo.save(Hashtag.builder().tagName(v).build()));
        }).collect(Collectors.toSet());

        ahrepo.saveAll(savedTags.stream().map(v->ArticleHashtag.builder().article(proto).hashtag(v).build()).toList());

        
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

    @Override
    public ArticleDTO intro() {
        Article result = arepo.findFirstByMenuOrderByAidDesc(Menu.INTRO)
                .orElse(Article.builder().context("소개글이 없습니다").articleCreatedDate(LocalDateTime.now()).build());
        return ArticleDTO.builder().context(result.getContext()).articleCreatedDate(result.getArticleCreatedDate())
                .build();
    }

    @Override
    @Transactional
    public HashMap<String, Object> searchedList(String keywords, Integer page, Integer size) {
        HashMap<String, Object> result = new HashMap<>();
        Page<Article> entities = arepo.searchList(PageRequest.of(page, size, Direction.DESC, "aid"), keywords);
        result.put("articles", entities.getContent().stream().map(v -> toDTO(v)).toList());
        result.put("total", entities.getTotalPages());
        return result;
    }

    @Override
    public articleCountByMenu countByMenu() {
        return arepo.countingArticleByMenu();
    }
}
