package net.gumyo.bblog.entity;

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
    private String insertdate;
}
