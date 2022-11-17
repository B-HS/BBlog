package dev.hyns.bblogback.Service.ArticleService;

import java.io.File;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;
import org.apache.commons.io.FilenameUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartRequest;

import dev.hyns.bblogback.DTO.ArticleDTO;
import dev.hyns.bblogback.DTO.ReplyDTO;
import dev.hyns.bblogback.Entity.Article;
import dev.hyns.bblogback.Entity.ArticleImage;
import dev.hyns.bblogback.Entity.Hashtag;
import dev.hyns.bblogback.Entity.Members;
import dev.hyns.bblogback.Entity.Reply;
import dev.hyns.bblogback.Repository.ArticleImageRepository;
import dev.hyns.bblogback.Repository.ArticleRepository;
import dev.hyns.bblogback.Repository.HashtagRepository;
import dev.hyns.bblogback.Repository.ReplyRepository;
import dev.hyns.bblogback.Repository.ArticleRepository.getArticleCard;
import dev.hyns.bblogback.VO.ArticleCardInfo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@RequiredArgsConstructor
@Log4j2
public class ArticleServiceImpl implements ArticleService {
    private final ArticleRepository arepo;
    private final ArticleImageRepository airepo;
    private final HashtagRepository hrepo;
    private final String DIRADRESS = "/Users/hyunseokbyun/Documents/Imagefiles/";
    private final ReplyRepository rrepo;
    private final PasswordEncoder pEncoder;

    @Override
    public boolean deleteReply(Long rid) {
        rrepo.deleteById(rid);
        return true;
    }

    @Override
    public boolean addReply(ReplyDTO dto) {
        if (dto.isLogged()) {
            rrepo.save(Reply.builder()
                    .mid(Members.builder().mid(dto.getMember().getMid()).build())
                    .article(Article.builder().aid(dto.getArticleid()).build())
                    .logged(dto.isLogged())
                    .hide(dto.isHide())
                    .context(dto.getContext())
                    .replyGroup(dto.getReplyGroup())
                    .replySort(dto.getReplySort())
                    .build());
            return true;
        } else if (!dto.isLogged()) {
            rrepo.save(Reply.builder()
                    .article(Article.builder().aid(dto.getArticleid()).build())
                    .guestName(dto.getMember().getNickname())
                    .replypwd(pEncoder.encode(dto.getReplypwd()))
                    .hide(dto.isHide())
                    .logged(dto.isLogged())
                    .context(dto.getContext())
                    .replyGroup(dto.getReplyGroup())
                    .replySort(dto.getReplySort())
                    .build());
            return true;
        }
        return false;
    }

    @Override
    public HashMap<String, Object> recentArticleList(Pageable pageable) {
        HashMap<String, Object> result = new HashMap<>();
        Page<getArticleCard> paging = arepo.RecentArticleList(pageable);
        // 인터페이스 그냥 넣고싶은데 연습용으로 VO하나 만들어서 넣어봄
        result.put("dtoList", paging.stream().map(v -> new ArticleCardInfo(v)).toList());
        result.put("currentPage", paging.getNumber());
        result.put("totalPage", paging.getTotalPages());
        return result;
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
            result.forEach(v -> log.info(v));
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

        imgs.ifPresentOrElse((images) -> {
            for (int i = 0; i < images.size(); i++) {
                airepo.save(ArticleImage.builder().article(Article.builder().aid(articleid).build())
                        .fileName(images.get(i)).idx(i).build());
            }
        }, () -> {
            airepo.save(ArticleImage.builder().article(Article.builder().aid(articleid).build()).fileName("basic.png")
                    .idx(0).build());
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
        List<ReplyDTO> filteredReply =  new ArrayList<>();
        List<ReplyDTO> replies = dto.getReply();
        for (int i = 0; i < replies.size(); i++) {
            Long num = (long)i;
            replies.stream().filter(v->v.getReplyGroup()==num).toList().forEach(v->filteredReply.add(v));
        }
        dto.setReply(filteredReply);
        if (dto.isHide() == true) {
            return null;
        }
        return dto;
    }

    @Override
    public boolean updateReply(ReplyDTO dto) {
        
        return false;
    }
}
