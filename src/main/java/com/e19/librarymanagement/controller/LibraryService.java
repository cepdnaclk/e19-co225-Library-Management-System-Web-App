package com.e19.librarymanagement.controller;

import com.e19.librarymanagement.dto.UserDto;
import com.e19.librarymanagement.repositories.UserRepository;
import com.e19.librarymanagement.models.User;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class LibraryService {
    private final UserRepository repository;

    public List<UserDto> getAllUser() {
        List<User> users = repository.findAll();
        List<UserDto> userDtos = new ArrayList<>();

        for(User user: users){
            UserDto userDto = dtoCreate(user);

            userDtos.add(userDto);
        }

        return userDtos;
    }

    public UserDto getUserById(Long userId){
        User user = repository.findById(userId)
                .orElseThrow();

        UserDto userDto = dtoCreate(user);

        return userDto;
    }

    public UserDto dtoCreate(User user) {
        UserDto userDto = new UserDto();
        userDto.setFirstname(user.getFirstname());
        userDto.setLastname(user.getLastname());
        userDto.setContact(user.getContact());
        userDto.setBirthday(user.getBirthday());
        userDto.setId(user.getId());
        userDto.setAddress(user.getAddress());
        userDto.setEmail(user.getEmail());

        return userDto;
    }

    public void deleteUser(Long userId){
        if(!repository.existsById(userId)){
            throw new UsernameNotFoundException("User not found");
        }
        repository.deleteById(userId);
    }
}
