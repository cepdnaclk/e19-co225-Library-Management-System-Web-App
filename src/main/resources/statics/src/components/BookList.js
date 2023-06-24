import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';
import './BookList.css';
import axios from 'axios';

const BookList = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const deleteBookHandler = (id) => {
    props.deleteBookHandler(id);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredBooks = props.books.filter((book) =>
      book.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredBooks);

    const accessToken = localStorage.getItem('accessToken');
    axios.get('http://localhost/api/v1/book', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => {
        // Handle the API response
      })
      .catch(error => {
        // Handle any errors
      });
  };

  const renderBookList = [...searchResults, ...props.books.filter((book) => !searchResults.includes(book))];

  return (
    <div className="booklist-container">
      <h2>Book List</h2>
      <form className="ui form" onSubmit={handleSearch}>
        <div className="field">
          <input
            type="text"
            placeholder="Search by book name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button type="submit">Search</button>
      </form>
      <Link to="/addbook">
        <button type="submit">Add Book</button>
      </Link>
      <div className="ui celled list">
        {renderBookList.map((book) => (
          <BookCard
            book={book}
            deleteBookHandler={deleteBookHandler}
            key={book.id}
          />
        ))}
      </div>
     
    </div>
  );
};

export default BookList;
