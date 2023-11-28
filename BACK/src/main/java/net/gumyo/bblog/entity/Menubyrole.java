package net.gumyo.bblog.entity;

import org.springframework.data.annotation.CreatedDate;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import net.gumyo.bblog.entity.pks.MexroPk;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Menubyrole {
    @EmbeddedId
    private MexroPk pk;

    @Column
    @CreatedDate
    private String insertDate;
}
