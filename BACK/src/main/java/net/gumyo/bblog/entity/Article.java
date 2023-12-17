
package net.gumyo.bblog.entity;

import org.springframework.data.annotation.CreatedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long aid;

    @Column
    private String title;

    @Column(columnDefinition = "LONGTEXT")
    private String context;

    @Column
    private String thumbnail;

    @Column
    private String[] tags;

    @Column
    private Long mekey;

    @Column
    private Boolean hide;

    @Column
    private Integer viewcount;

    @Column
    @CreatedDate
    private String insertdate;

    public void increateViewCount() {
        if (this.viewcount == null) {
            this.viewcount = 1;
        } else {
            this.viewcount = this.viewcount + 1;
        }

    }
}
