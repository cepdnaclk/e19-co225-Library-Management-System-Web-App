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

    private Integer borrowingId;

    @OneToOne
    @JoinColumn(
            name = "member_id",
            referencedColumnName = "user_id",
            foreignKey = @ForeignKey(
                    name = "member_id_fk"
            )
    )
    private User user;

    @OneToOne
    @JoinColumn(
            name = "book_id",
            referencedColumnName = "isbn",
            foreignKey = @ForeignKey(
                    name = "book_id_fk"
            )
    )
    private Book book;

    @Column(
            name = "borrowed_date",
            updatable = false
    )
    private String borrowedDate;

    @Column(
            name = "due_date"
    )
    private String dueDate;

}
