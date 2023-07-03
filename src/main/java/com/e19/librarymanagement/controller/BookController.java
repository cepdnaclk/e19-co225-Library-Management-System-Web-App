package com.e19.librarymanagement.controller;

import com.e19.librarymanagement.dto.BookDto;
import com.e19.librarymanagement.models.Book;
import com.e19.librarymanagement.service.BookService;
import io.swagger.v3.oas.annotations.Hidden;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/book")
@PreAuthorize("hasRole('MEMBER')")
@AllArgsConstructor
public class BookController {
    private final BookService bookService;

    @GetMapping
    @PreAuthorize("hasAuthority('member:read')")
    public ResponseEntity<List<BookDto>> findAll(){
        return ResponseEntity.ok(bookService.getAllBook());
    }

    @PostMapping
    @PreAuthorize("hasAuthority('librarian:create')")
    @Hidden
    public String addBook(@RequestBody BookDto bookDto){
        bookDto.setAvailable(true);
        bookService.addBook(bookDto);
        return "Book added";
    }

    @GetMapping("/{bookTitle}")
    @PreAuthorize("hasAuthority('member:read')")
    public ResponseEntity<BookDto> getBookByTitle(
            @PathVariable("bookTitle") String bookTitle
    ){
        return ResponseEntity.ok(bookService.getBookByTitle(bookTitle));
    }

    @DeleteMapping("/{bookTitle}")
    @PreAuthorize("hasAuthority('librarian:delete')")
    @Hidden
    public String delete(
            @PathVariable("bookTitle") String title
    ){
        bookService.getBookByTitle(title);
        return "book deleted";
    }

}
