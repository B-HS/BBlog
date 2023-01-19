package hyns.dev.bblogbacksecond.Entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

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
public class Reply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rid;

    @Column(columnDefinition = "LONGTEXT")
    private String context;

    @Column
    private String guestName;

    @Column
    private String guestPassword;

    @Column 
    private Long replyGroup;

    @Column 
    private Long replySort;

    @Column(updatable = false)
    @CreatedDate
    private LocalDateTime replyCreatedDate;

    @Column
    private Boolean hide;

    @ManyToOne
    private Member member;
    
    @ManyToOne
    private Article article;

    public void updateReplyContextForModifyingContext(String context){
        this.context = context;
    }
}
