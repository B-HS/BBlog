package dev.hyns.bblogback.VO;

import java.nio.charset.Charset;
import java.time.LocalDateTime;

import dev.hyns.bblogback.Repository.ArticleRepository.getArticleCard;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class ArticleCardInfo {
    private Long aid;
    private String title;
    private String context;
    private LocalDateTime regdate;
    private Integer replyCount;
    private String imgFileName;
    private Integer requestedPage;
    private Integer totalPageSize;

    public ArticleCardInfo(getArticleCard articleCard) {
        this.aid = articleCard.getAid();
        this.title = articleCard.getTitle();
        this.context = updateContextToString(articleCard.getContext());
        this.regdate = articleCard.getRegdate();
        this.replyCount = articleCard.getReplyCount();
        this.imgFileName = articleCard.getImgFileName();
    }

    public String updateContextToString(byte[] context) {
        String result = new String(context, Charset.forName("utf-8"));
        return result;
    }
}
