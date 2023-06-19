package com.e19.librarymanagement.controller;

import com.e19.librarymanagement.auth.AuthenticationService;
import com.e19.librarymanagement.auth.RegisterRequest;
import com.e19.librarymanagement.repository.UserRepository;
import com.e19.librarymanagement.user.User;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AdminService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void addUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }
}
