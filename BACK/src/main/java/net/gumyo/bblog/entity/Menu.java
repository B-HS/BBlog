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
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mekey;

    @Column
    private String mename;

    @Column
    private Long parentmekey;

    @Column
    private Integer meorder;

    @Column
    private Boolean hide;

    @Column
    private String icon;

    @Column
    private MenuType type;

    public enum MenuType {
        PAGE, LIST
    }

}
