package com.e19.librarymanagement.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
    private Integer id;
    private String firstname;
    private String lastname;
    private String address;
    private String email;
    private Integer contact;
    private String birthday;
}
