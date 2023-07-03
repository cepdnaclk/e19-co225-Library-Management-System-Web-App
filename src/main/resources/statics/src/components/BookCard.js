import React from 'react';
import book from '../images/book.png';
import './BookCard.css';

//component which are representing a book card in the library 
const BookCard =({book,deleteBookHandler}) =>{
  const { id, name, author, shelf } = book;
  
  //Handle delete event
  const handleDelete = () => {
    deleteBookHandler(id);
 
  };

  return (
    <div className="item">
      <img className="ui avatar image" src={book} alt="book" />
      <div className="content-container">
        <div className="header">{name}</div>
        <hr />
        <div className="author">Author: {author}</div>
        <div className="shelf">Shelf Number: {shelf}</div>
      </div>
      <i
        className="trash alternate outline icon trash-icon"
        onClick={handleDelete}
      ></i>
    </div>
  );
};

export default BookCard;
