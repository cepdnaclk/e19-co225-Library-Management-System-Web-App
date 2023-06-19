package com.e19.librarymanagement.controller;

import com.e19.librarymanagement.dto.UserDto;
import com.e19.librarymanagement.models.User;
import io.swagger.v3.oas.annotations.Hidden;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/library")
@PreAuthorize("hasRole('LIBRARIAN')")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class LibraryController {

    private final LibraryService libraryService;

    @GetMapping
    @PreAuthorize("hasAuthority('librarian:read')")
    public ResponseEntity<List<UserDto>> findAll() {
        return ResponseEntity.ok(libraryService.getAllUser());
    }

    @GetMapping("/{userId}")
    @PreAuthorize("hasAuthority('librarian:read')")
    public ResponseEntity<UserDto> getUserById(
            @PathVariable("userId") Long userId
    ) {
        return ResponseEntity.ok(libraryService.getUserById(userId));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('librarian:create')")
    @Hidden
    public String post(@RequestBody User user) {
        return "GET:: librarian controller";
    }
    @PutMapping
    @PreAuthorize("hasAuthority('librarian:update')")
    @Hidden
    public String put() {
        return "PUT:: librarian controller";
    }
    @DeleteMapping
    @PreAuthorize("hasAuthority('librarian:delete')")
    @Hidden
    public String delete(
            @PathVariable("userId") Long userId
    ) {
        libraryService.deleteUser(userId);
        return "user deleted";
    }
}
