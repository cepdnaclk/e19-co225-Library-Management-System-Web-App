import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MemberBookReservation.css";
import BookList from "./BookList";
import BookSearchResults from "./BookSearchResults";

const MemberBookReservation = () => {
  const [reservationData, setReservationData] = useState({
    memberId: "",
    memberName: "",
    bookTitle: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [books, setBooks] = useState([]);
  const [availableBooks, setAvailableBooks] = useState([]);

  useEffect(() => {
    // Fetch all books from the backend API and set them in the books state
    // Replace the API endpoint with your actual backend API endpoint for fetching books
    fetch("api/v1/book")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        console.log("Error fetching books:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservationData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const navigate = useNavigate();

  const handleSearch = () => {
    // Filter the books list based on the partial match of the bookTitle entered in the search
    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(reservationData.bookTitle.toLowerCase())
    );

    // Filter the available books from the filtered books list
    const availableBooks = filteredBooks.filter((book) => book.status === "Available");

    setAvailableBooks(availableBooks);

    // Navigate to the search results page
    navigate("/book-search-results");
  };

  const handleReservation = (bookId) => {
    // Find the selected book from the availableBooks list based on the bookId
    const selectedBook = availableBooks.find((book) => book.id === bookId);

    // Perform the reservation logic only if the selectedBook exists
    if (selectedBook) {
      // Check if the book has at least one copy available
      if (selectedBook.copies > 0) {
        // Perform the reservation logic here
        console.log("Reserving book with id:", bookId);

        // Update the book's copies and status
        const updatedBooks = books.map((book) => {
          if (book.id === bookId) {
            // Reduce the number of copies by one
            const updatedCopies = book.copies - 1;

            // Update the book's status based on the number of copies
            const updatedStatus = updatedCopies === 0 ? "Unavailable" : "Available";

            return {
              ...book,
              copies: updatedCopies,
              status: updatedStatus
            };
          }
          return book;
        });

        // Update the books state with the updated book list
        setBooks(updatedBooks);

        // Reset the form after reservation
        setReservationData({
          memberId: "",
          memberName: "",
          bookTitle: ""
        });
        setMessage("Reservation successful");
        setError("");
      } else {
        // Book is not available for reservation
        setMessage("");
        setError("The book is not available for reservation.");
      }
    }
  };

  return (
    <div className="member-book-reservation">
      <h2>Member Book Reservation</h2>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSearch}>
        <div className="input-group">
          <label className="label-book-title" htmlFor="bookTitle">
            Book Title<br></br>  
          </label>
          <input
            type="text"
            id="bookTitle"
            name="bookTitle"
            value={reservationData.bookTitle}
            onChange={handleInputChange}
            required
          />
          <div className="background-rectangle"></div>
        </div>
        <button type="submit">Search</button>
      </form>
      <div className="book-list">
        {availableBooks.length > 0 ? (
          <BookList books={availableBooks} reserveHandler={handleReservation} />
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default MemberBookReservation;
