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
public class SystemLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sid;
    @Column
    private String controller;
    @Column
    private String method;
    @Column(columnDefinition = "LONGTEXT")
    private String params;
    @Column
    private String ipv6;
    @Column
    private String ipv4;
    @Column
    private String insertdate;
}
