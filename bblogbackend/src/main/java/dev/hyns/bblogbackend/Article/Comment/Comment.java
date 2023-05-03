package dev.hyns.bblogbackend.Article.Comment;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import dev.hyns.bblogbackend.Article.Article;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rid;
    @Column(columnDefinition = "LONGTEXT")
    private String commentDesc;
    @Column
    private String nickname;
    @Column
    private String pw;
    @Column
    private Long commentGroup;
    @Column
    private Long commentSort;
    @Column(columnDefinition = "LONGTEXT")
    private String commentImg;
    @CreatedDate
    private LocalDateTime uploadedDated;
    @ManyToOne
    private Article article;
    public void updateComment(CommentDTO dto){this.commentDesc = dto.getCommentDesc();}
}
