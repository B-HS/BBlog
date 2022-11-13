package dev.hyns.bblogback.Service.ArticleService;

import dev.hyns.bblogback.DTO.ArticleDTO;
import dev.hyns.bblogback.DTO.ReplyDTO;
import dev.hyns.bblogback.Entity.Article;
import dev.hyns.bblogback.Entity.Menu;
import dev.hyns.bblogback.Entity.Reply;

public interface ArticleService {
    Long write(ArticleDTO dto);

    ArticleDTO read(Long aid);

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
                .reply(entity.getReply().stream().map(ele -> ReplyEntityToDTO(ele)).toList())
                .hashtag(entity.getHashtag().stream().map(hash->hash.getTagname()).toList())
                .visitor(entity.getVisitor().size())
                .regdate(entity.getRegDate())
                .build();
    }

    default ReplyDTO ReplyEntityToDTO(Reply entity) {
        return ReplyDTO
                .builder()
                .rid(entity.getRid())
                .context(entity.getContext())
                .replyGroup(entity.getReplyGroup())
                .replySort(entity.getReplySort())
                .articleid(entity.getArticle().getAid())
                .regdate(entity.getRegDate())
                .build();
    }
    

}
