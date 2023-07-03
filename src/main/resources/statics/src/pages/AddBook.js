import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const AddBook = () => {
    const [isbn, setIsbn] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [pub_year, setPubYear] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = {
            isbn: isbn,
            title: title,
            author: author,
            pub_year: pub_year,
          };

          const token = localStorage.getItem('accessToken');
          console.log(formData);
        
          axios.post('http://localhost:8080/api/v1/book', formData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
            .then(response => {
              // Handle the response from the API
              console.log(response.data);
              window.alert(response.data);
            })
            .catch(error => {
              // Handle any errors that occurred during the request
              console.error(error);
              //window.alert(error);
            });
    }

    const handleBack = () => {
      navigate('/librarian')
    };

  return (
    <div className="member-book-reservation">
      <div className="back-button" onClick={handleBack}>
        Back
      </div>
      <h2>Library Book Add</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="label-book-title" htmlFor="bookTitle">
            Book ISBN<br></br>
          </label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
          />
          <div className="background-rectangle"></div>
        </div>
        <div className="input-group">
            <label className="label-book-title" htmlFor="bookTitle">
                Book Title<br></br>
            </label>
            <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <div className="background-rectangle"></div>
        </div>
        <div className="input-group">
            <label className="label-book-title" htmlFor="bookTitle">
                Book Author<br></br>
            </label>
            <input
                type="text"
                id="author"
                name="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
            />
            <div className="background-rectangle"></div>
        </div>
        <div className="input-group">
            <label className="label-book-title" htmlFor="bookTitle">
                Publication Year<br></br>
            </label>
            <input
                type="text"
                id="pub_year"
                name="pub_year"
                value={pub_year}
                onChange={(e) => setPubYear(e.target.value)}
                required
            />
            <div className="background-rectangle"></div>
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>

  );
};