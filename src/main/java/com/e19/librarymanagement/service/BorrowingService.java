package com.e19.librarymanagement.service;
import com.e19.librarymanagement.dto.BorrowingDto;
import com.e19.librarymanagement.models.Book;
import com.e19.librarymanagement.models.Borrowing;
import com.e19.librarymanagement.models.User;
import com.e19.librarymanagement.repositories.BookRepository;
import com.e19.librarymanagement.repositories.BorrowingRepository;
import com.e19.librarymanagement.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class BorrowingService {
    private final BookRepository bookRepository;
    private final BorrowingRepository borrowingRepository;
    private final UserRepository userRepository;

    public BorrowingDto getBorrowingByUserName(String email){
        User user = userRepository.findByEmail(email).orElseThrow();
        Borrowing borrowing = borrowingRepository.findByUser(user).orElseThrow();
        BorrowingDto borrowingDto = dtoCreate(borrowing);

        return borrowingDto;
    }

    public void addBorrowing(BorrowingDto borrowingDto){
        User user = userRepository.findByEmail(borrowingDto.getUserEmail()).orElseThrow();
        Book book = bookRepository.findBookByTitle(borrowingDto.getBookTitle()).orElseThrow();

        Borrowing borrowing = Borrowing
                .builder()
                .user(user)
                .book(book)
                .borrowedDate(borrowingDto.getBorrowedDate())
                .dueDate(borrowingDto.getDueDate())
                .build();
        borrowingRepository.save(borrowing);
    }

    public List<BorrowingDto> getAll(){
        List<Borrowing> borrowings = borrowingRepository.findAll();
        List<BorrowingDto> borrowingDtos = new ArrayList<>();

        for(Borrowing borrowing: borrowings){
            BorrowingDto bookDto = dtoCreate(borrowing);

            borrowingDtos.add(bookDto);
        }

        return  borrowingDtos;
    }

    public BorrowingDto dtoCreate(Borrowing borrowing){
        BorrowingDto borrowingDto = new BorrowingDto();
        borrowingDto.setBorrowingId(borrowing.getBorrowingId());
        borrowingDto.setBookTitle(borrowing.getBook().getTitle());
        borrowingDto.setUserEmail(borrowing.getUser().getEmail());
        borrowingDto.setBorrowedDate(borrowing.getBorrowedDate());
        borrowingDto.setDueDate(borrowing.getDueDate());

        return borrowingDto;
    }
}
