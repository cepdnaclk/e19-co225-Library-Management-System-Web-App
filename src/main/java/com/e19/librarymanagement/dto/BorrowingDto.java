package com.e19.librarymanagement.dto;

import com.e19.librarymanagement.models.Book;
import com.e19.librarymanagement.models.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BorrowingDto {

    private Integer id;
    private User user;
    private Book book;
    private String borrowingDate;
    private String dueDate;

}
