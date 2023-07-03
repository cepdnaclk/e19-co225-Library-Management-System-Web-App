import React from 'react';
import './css/MemberDashboard.css';
import { useNavigate } from 'react-router-dom';

export const LibrarianDashboard = () => {

  const navigate = useNavigate();

  const navigateToAddBook = () => {
    // Code to navigate to the current book page
    console.log('Navigating to current book page');
    navigate('/librarian/add-book')
  };

  const navigateToSearchBook = () => {
    // Code to navigate to the search book page
    console.log('Navigating to search book page');
    navigate('/librarian/search-book')
  };

  const navigateToSearchUser = () => {
    // Code to navigate to the search book page
    console.log('Navigating to user search');
    navigate('/librarian/search-user')
  };

  const navigateToBookReservation = () => {
    // Code to navigate to the search book page
    console.log('Navigating to book reservation');
    navigate('/librarian/reservation')
  };

  const navigateToBorrowingSearch = () => {
    // Code to navigate to the search book page
    console.log('Navigating to borrowing search');
    navigate('/librarian/search-borrowing')
  };

  return (
    <div className="dashboard">
      <div className="button" onClick={navigateToAddBook}>
        Add Book
      </div>
      <div className="button" onClick={navigateToSearchBook}>
        Search Book
      </div>
      <div className="button" onClick={navigateToSearchUser}>
        Search User
      </div>
      <div className="button" onClick={navigateToBookReservation}>
        Book Reservation
      </div>
      <div className="button" onClick={navigateToBorrowingSearch}>
        Search Borrowings
      </div>
    </div>
  );
};
