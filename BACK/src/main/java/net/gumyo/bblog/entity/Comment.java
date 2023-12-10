package net.gumyo.bblog.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cid;

    @Column
    private Long aid;

    @Column
    private String nickname;

    @Column
    private String img;

    @Column
    private String context;

    @Column
    private Long commentorder;

    @Column
    private Long uppercid;

    @Column
    @JsonIgnore
    private String password;

    @Column
    private Boolean deleted;

    @Column
    private Boolean modified;

    @Column
    private String insertdate;

    public void updateComment(String context) {
        this.context = context;
        this.modified = true;
    }

    public void deleteComment() {
        this.deleted = true;
    }

    public void deleteContext() {
        this.context = null;
    }
}
