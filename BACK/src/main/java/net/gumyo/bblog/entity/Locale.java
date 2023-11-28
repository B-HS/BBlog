package net.gumyo.bblog.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
public class Locale {
    @Id
    private String msgKey;

    @Column
    private String ko_text;

    @Column
    private String jp_text;

    @Column
    private String en_text;
}
