package net.gumyo.bblog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Integer urkey;
    private String urname;
    private String urNickname;
    private String email;
    private String pw;
    private Boolean isAuthed;
    private Boolean isDisabled;
    private Boolean isDeleted;
    private Boolean isLogged;
    private String introduce;
    private String insertDate;
    private String lastLogin;
}