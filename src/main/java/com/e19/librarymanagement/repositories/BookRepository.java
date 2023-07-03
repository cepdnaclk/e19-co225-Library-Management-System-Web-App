package com.e19.librarymanagement.repositories;

import com.e19.librarymanagement.models.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, String> {
    Optional<Book> findBookByTitle(String title);
}
