package com.e19.librarymanagement.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookDto {
    private String isbn;
    private String title;
    private String author;
    private Integer pub_year;
    private boolean available;
}
