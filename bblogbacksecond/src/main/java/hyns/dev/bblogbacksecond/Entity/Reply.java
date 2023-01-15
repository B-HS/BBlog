package hyns.dev.bblogbacksecond.Entity;

import java.nio.charset.Charset;
import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
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
public class Reply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rid;

    @Column
    @Lob
    private byte[] context;

    @Column
    private String guestName;

    @Column
    private String guestPassword;

    @Column(updatable = false)
    @CreatedDate
    private LocalDateTime replyCreatedDate;
    
    @ManyToOne
    private Article aritlce;

    @ManyToOne
    private Member member;
    
    @ManyToOne
    private Article article;

    public String updateContextToString(byte[] byteString){
        return new String(byteString, Charset.forName("utf8"));
    }

}
