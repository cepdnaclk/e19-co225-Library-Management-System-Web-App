import React from 'react';
import BookCard from './BookCard';
import "./MemberBookReservation.css";

const BookSearchResults = ({ books, reserveHandler }) => {
  return (
    <div className="book-search-results">
      <h3>Search Results</h3>
      {books.length > 0 ? (
        <div className="book-list">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              reserveHandler={reserveHandler}
            />
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default BookSearchResults;

