package com.e19.librarymanagement.repositories;

import com.e19.librarymanagement.models.Borrowing;
import com.e19.librarymanagement.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BorrowingRepository extends JpaRepository<Borrowing, Integer> {
    Borrowing findBorrowingByUser(User user);
}

