import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import AddBook from './AddBook';
import BookList from './BookList';
import { Login } from './Login';
import { Register } from './Register';


function App() {
  const LOCAL_STORAGE_KEY = "books";
  const [books, setBooks] = useState([]);
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  const addBookHandler = (book) => {
    setBooks((prevBooks) => {
      const updatedBooks = [...prevBooks, book];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedBooks));
      return updatedBooks;
    });
  };

  const deleteBookHandler = (id) => {
    setBooks((prevBooks) => {
      const updatedBooks = prevBooks.filter((book) => book.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedBooks));
      return updatedBooks;
    });
  };

  useEffect(() => {
    const retrieveBooks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retrieveBooks) {
      setBooks(retrieveBooks);
    }
  }, []);

  return (
    <div className="App">
      <div className="ui container">
        <Router>
          <div style={{ marginTop: "100px" }}>
            <Header />
            <Routes>
              <Route path="/addbook" element={<AddBook addBookHandler={addBookHandler} />} />
              <Route path="/booklist" element={<BookList books={books} deleteBookHandler={deleteBookHandler} />} />
              <Route path="/" element={
                currentForm === "login"
                  ? <Login onFormSwitch={toggleForm} />
                  : <Register onFormSwitch={toggleForm} />
              } />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
