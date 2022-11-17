package dev.hyns.bblogback.Service.ArticleService;

import java.util.HashMap;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartRequest;

import dev.hyns.bblogback.DTO.ArticleDTO;
import dev.hyns.bblogback.DTO.ReplyDTO;
import dev.hyns.bblogback.Entity.Article;
import dev.hyns.bblogback.Entity.Menu;
import dev.hyns.bblogback.Service.MembersService.MembersService;
import dev.hyns.bblogback.VO.MemberInfoForReply;

public interface ArticleService extends MembersService {
    Long write(ArticleDTO dto);

    ArticleDTO read(Long aid);

    HashMap<String, Object> recentArticleList(Pageable pageable);

    boolean addReply(ReplyDTO dto);
    boolean deleteReply(Long rid);
    boolean updateReply(ReplyDTO dto);
    String ImgUpload(MultipartRequest file);

    List<Object> ImgRead(String filename);

    default Article ArticleDTOtoEntity(ArticleDTO dto) {
        return Article.builder()
                .title(dto.getTitle())
                .context(dto.getContext().getBytes())
                .hide(dto.isHide())
                .menu(Menu.builder().lid(dto.getMenuid()).build())
                .build();
    }

    default ArticleDTO ArticleEntitytoDTO(Article entity) {
        return ArticleDTO.builder()
                .title(entity.getTitle())
                .context(entity.updateContextToString(entity.getContext()))
                .hide(entity.isHide())
                .menuid(entity.getMenu().getLid())
                .reply(entity.getReply().stream().map(ele -> {
                    ReplyDTO tmp = ReplyDTO.builder()
                            .rid(ele.getRid())
                            .context(ele.getContext())
                            .replyGroup(ele.getReplyGroup())
                            .replySort(ele.getReplySort())
                            .articleid(ele.getArticle().getAid())
                            .logged(ele.isLogged())
                            .hide(ele.isHide())
                            .regdate(ele.getRegDate())
                            .build();
                    if (tmp.isLogged()) {
                        tmp.setMember(EntityToReplyMemberInfo(ele.getMid()));
                    } else {
                        tmp.setMember(MemberInfoForReply.builder().nickname(ele.getGuestName()).userimg("basic.png").build());
                    }
                    return tmp;
                }).toList())
                .hashtag(entity.getHashtag().stream().map(hash -> hash.getTagname()).toList())
                .visitor(entity.getVisitor().size())
                .regdate(entity.getRegDate())
                .build();
    }

}
