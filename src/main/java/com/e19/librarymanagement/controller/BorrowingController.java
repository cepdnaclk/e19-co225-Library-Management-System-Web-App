package com.e19.librarymanagement.controller;


import com.e19.librarymanagement.dto.BorrowingDto;
import com.e19.librarymanagement.service.BorrowingService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/borrowing")
@PreAuthorize("hasRole('LIBRARIAN')")
@AllArgsConstructor
public class BorrowingController {
    private final BorrowingService borrowingService;

    @GetMapping
    @PreAuthorize("hasAuthority('librarian:read')")
    public ResponseEntity<List<BorrowingDto>> findAll(){
        return ResponseEntity.ok(borrowingService.getAll());
    }

    @PostMapping
    @PreAuthorize("hasAuthority('librarian:create')")
    public String addBook(@RequestBody BorrowingDto borrowingDto){
        borrowingService.addBorrowing(borrowingDto);
        return "Borrowing added";
    }
}
