package net.gumyo.bblog.entity.pks;

import jakarta.persistence.Embeddable;
import lombok.Getter;

@Embeddable
@Getter
public class MexroPk {
    private Long mekey;
    private Long rokey;

    public MexroPk() {
    }

    public MexroPk(Long rokey, Long mekey) {
        this.rokey = rokey;
        this.mekey = mekey;
    }
}
