package com.e19.librarymanagement.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_book")
public class Book {
    @Id
    @Column(
            name = "isbn",
            nullable = false
    )
    private String ISBN;

    @Column(
            name = "title",
            nullable = false
    )
    private String title;

    @Column(
            name = "author",
            nullable = false
    )
    private String author;

    @Column(
            name = "publication_year",
            nullable = false
    )
    private Integer pub_year;

}
