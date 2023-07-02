package com.e19.librarymanagement.repositories;

import com.e19.librarymanagement.models.Borrowing;
import com.e19.librarymanagement.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BorrowingRepository extends JpaRepository<Borrowing, Integer> {

    Optional<Borrowing> findByUser(User user);
}
