import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const BookSearchResults = () => {
  const location = useLocation();
  const reservationData = location.state?.reservationData || {};

  const [availableBooks, setAvailableBooks] = useState([]);

  useEffect(() => {
    // Fetch the available books from the backend API based on the reservation data
    fetch("api/v1/book/available", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reservationData)
    })
      .then((response) => response.json())
      .then((data) => {
        setAvailableBooks(data);
      })
      .catch((error) => {
        console.log("Error fetching available books:", error);
      });
  }, [reservationData]);

  const handleReservation = (bookId) => {
    // Perform the reservation logic for the selected book
    // You can record the reservation in the reservation table here
    console.log("Reserving book with id:", bookId);
    
  };

  return (
    <div className="book-search-results">
      <h2>Book Search Results</h2>
      <h3>Member ID: {reservationData.memberId}</h3>
      <h3>Member Name: {reservationData.memberName}</h3>
      {availableBooks.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ISBN</th>
              <th>Title</th>
              <th>Author</th>
              <th>Publication Year</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {availableBooks.map((book) => (
              <tr key={book.isbn}>
                <td>{book.isbn}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publicationYear}</td>
                <td>
                  <button onClick={() => handleReservation(book.isbn)}>Reserve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No available books found.</p>
      )}
    </div>
  );
};

export default BookSearchResults;
