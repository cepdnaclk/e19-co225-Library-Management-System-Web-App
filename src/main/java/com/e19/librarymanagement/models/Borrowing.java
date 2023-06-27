package com.e19.librarymanagement.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_borrowing")
public class Borrowing {
    @Id
    @SequenceGenerator(
            name = "borrowing_sequence",
            sequenceName = "borrowing_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "borrowing_sequence"
    )
    @Column(
            name = "borrowing_id",
            updatable = false
    )
    private  Integer Id;

    @ManyToOne
    @JoinColumn(
            name = "user_id",
            nullable = false,
            referencedColumnName = "user_id",
            foreignKey = @ForeignKey(
                    name = "borrowing_fk"
            )
    )
    private User user;

    @OneToOne
    @JoinColumn(
            name = "book_id",
            nullable = false,
            referencedColumnName = "isbn",
            foreignKey = @ForeignKey(
                    name = "book_fk"
            )
    )
    private Book book;

    @Column(
            name = "borrowing_date",
            nullable = false
    )
    private String borrowingDate;

    @Column(
            name = "due_date",
            nullable = false
    )
    private String dueDate;

}
