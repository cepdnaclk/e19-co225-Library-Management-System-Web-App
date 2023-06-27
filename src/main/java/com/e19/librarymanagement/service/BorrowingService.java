package com.e19.librarymanagement.service;

import com.e19.librarymanagement.dto.BorrowingDto;
import com.e19.librarymanagement.models.Borrowing;
import com.e19.librarymanagement.models.User;
import com.e19.librarymanagement.repositories.BorrowingRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BorrowingService {
    private final BorrowingRepository borrowingRepository;

    public BorrowingDto getBorrowingByUser(User user){
        Borrowing borrowing = borrowingRepository.findBorrowingByUser(user);
        BorrowingDto borrowingDto = dtoCreate(borrowing);

        return borrowingDto;
    }

    private BorrowingDto dtoCreate(Borrowing borrowing){
        BorrowingDto borrowingDto = new BorrowingDto();
        borrowingDto.setBook(borrowing.getBook());
        borrowingDto.setBorrowingDate(borrowing.getBorrowingDate());
        borrowingDto.setDueDate(borrowing.getDueDate());

        return borrowingDto;
    }

}
