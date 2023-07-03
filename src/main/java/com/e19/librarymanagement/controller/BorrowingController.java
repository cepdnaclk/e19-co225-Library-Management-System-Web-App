package com.e19.librarymanagement.controller;

import com.e19.librarymanagement.dto.BorrowingDto;
import com.e19.librarymanagement.dto.UserDto;
import com.e19.librarymanagement.models.Book;
import com.e19.librarymanagement.service.BorrowingService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/v1/borrowing")
@PreAuthorize("hasRoles('MEMBER', 'LIBRARIAN')")
@AllArgsConstructor
public class BorrowingController {
    private final BorrowingService borrowingService;

    @GetMapping
    @PreAuthorize("hasAuthority('librarian:read')")
    public ResponseEntity<List<BorrowingDto>> findAll(){
        return ResponseEntity.ok(borrowingService.getAll());
    }

    @GetMapping("/{userEmail}")
    @PreAuthorize("hasAuthority('member:read')")
    public ResponseEntity<BorrowingDto> getBorrowingByEmail(
            @PathVariable("userEmail") String userEmail
    ) {
        System.out.println(userEmail);
        return ResponseEntity.ok(borrowingService.getBorrowingByEmail(userEmail));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('librarian:create')")
    public String addBook(@RequestBody BorrowingDto borrowingDto){

        LocalDate currentDate = LocalDate.now();
        LocalDate dueDate = currentDate.plusWeeks(2);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedCurrentDate = currentDate.format(formatter);
        String formatterDueDate = dueDate.format(formatter);

        borrowingDto.setBorrowedDate(formattedCurrentDate);
        borrowingDto.setDueDate(formatterDueDate);

        System.out.println(borrowingDto);

        borrowingService.addBorrowing(borrowingDto);
        return "Borrowing added";
    }
}
