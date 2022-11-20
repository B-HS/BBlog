package dev.hyns.bblogback.Entity;

import java.nio.charset.Charset;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Stacks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sid;

    @Column(nullable = false)
    private String title;

    @Lob
    @Column(nullable = false)
    private byte[] context;

    @Column(nullable = false)
    private int idx;

    public String updateContextToString(byte[] context) {
        String result = new String(context, Charset.forName("utf8"));
        return result;
    }
}
