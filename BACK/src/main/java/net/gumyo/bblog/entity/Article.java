
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
    private String[] tags;

    @Column
    private Long mekey;

    @Column
    private String fileseq;

    @Column
    private Boolean hide;

    @Column
    private String github;

    @Column
    private String publishlink;

    @Column
    @CreatedDate
    private String insertDate;
}
