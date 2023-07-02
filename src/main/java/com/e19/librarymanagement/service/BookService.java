package com.e19.librarymanagement.service;

import com.e19.librarymanagement.dto.BookDto;
import com.e19.librarymanagement.models.Book;
import com.e19.librarymanagement.repositories.BookRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class BookService {
    private final BookRepository bookRepository;

    public List<BookDto> getAllBook(){
        List<Book> books = bookRepository.findAll();
        List<BookDto> bookDtos = new ArrayList<>();

        for(Book book: books){
            BookDto bookDto = dtoCreate(book);

            bookDtos.add(bookDto);
        }

        return  bookDtos;
    }

    public  BookDto getBookByTitle(String title){
        Book book = bookRepository.findBookByTitle(title)
                .orElseThrow(() -> new NoSuchElementException("Book does not exits"));

        BookDto bookDto = dtoCreate(book);
        return bookDto;
    }

    public void deleteByISBN(String isbn){
        if(!bookRepository.existsById(isbn)){
            throw new NoSuchElementException("Book does not exist");
        }

        bookRepository.deleteById(isbn);
    }

    public void addBook(BookDto bookDto){
        Book book = Book.builder()
                .available(true)
                .ISBN(bookDto.getIsbn())
                .author(bookDto.getAuthor())
                .pub_year(bookDto.getPub_year())
                .title(bookDto.getTitle())
                .build();

        bookRepository.save(book);
    }

    public void addBook(Book book){
        bookRepository.save(book);
    }

    private BookDto dtoCreate(Book book) {
        BookDto bookDto = new BookDto();
        bookDto.setAuthor(book.getAuthor());
        bookDto.setIsbn(book.getISBN());
        bookDto.setPub_year(book.getPub_year());
        bookDto.setTitle(book.getTitle());
        bookDto.setAvailable(book.isAvailable());

        return bookDto;
    }
}
