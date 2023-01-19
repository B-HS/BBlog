package hyns.dev.bblogbacksecond.Service.ReplyService;

import java.util.HashMap;

import hyns.dev.bblogbacksecond.DTO.ReplyDTO;
import hyns.dev.bblogbacksecond.Entity.Article;
import hyns.dev.bblogbacksecond.Entity.Member;
import hyns.dev.bblogbacksecond.Entity.Reply;

public interface ReplyService {
    HashMap<String, Object> list(Long aid, Integer page, Integer size);
    Long wrtie(ReplyDTO dto, Boolean isUser);
    Long modify(ReplyDTO dto, Boolean isUser);
    Long delete(ReplyDTO dto, Boolean isUser);

    default ReplyDTO toDTO(Reply entity) {
        return ReplyDTO.builder()
                .rid(entity.getRid())
                .context(entity.getContext())
                .hide(entity.getHide())
                .replyGroup(entity.getReplyGroup())
                .replySort(entity.getReplySort())
                .aid(entity.getArticle().getAid())
                .replyCreatedDate(entity.getReplyCreatedDate())
                .build();
    }

    default Reply toEntity(ReplyDTO dto) {
        return Reply.builder()
                .rid(dto.getRid())
                .context(dto.getContext())
                .hide(dto.getHide())
                .replyGroup(dto.getReplyGroup())
                .replySort(dto.getReplySort())
                .member(Member.builder().mid(dto.getMember().getMid()).build())
                .article(Article.builder().aid(dto.getAid()).build())
                .build();
    }

    default Reply toEntityGuest(ReplyDTO dto) {
        return Reply.builder()
                .article(Article.builder().aid(dto.getAid()).build())
                .replyGroup(dto.getReplyGroup())
                .replySort(dto.getReplySort())
                .context(dto.getContext())
                .guestName(dto.getContext())
                .guestPassword(dto.getGuestPassword())
                .hide(dto.getHide())
                .build();
    }
}
