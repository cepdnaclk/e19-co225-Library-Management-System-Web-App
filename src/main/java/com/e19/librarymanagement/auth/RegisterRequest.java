package com.e19.librarymanagement.auth;

import com.e19.librarymanagement.user.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String address;
    private String birthday;
    private Integer contact;
    private Role role;
}
