import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import "./css/Reservation.css";
import axios from 'axios';

export const Reservation = () => {
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = {
            userEmail: email,
            bookTitle: title,
          };

          const token = localStorage.getItem('accessToken');
          console.log(formData);
        
          axios.post('http://localhost:8080/api/v1/borrowing', formData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
            .then(response => {
              // Handle the response from the API
              console.log(response.data);
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
      <h2>Member Book Reservation</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="label-book-title" htmlFor="bookTitle">
            Book Title<br></br>
          </label>
          <input
            type="text"
            id="bookTitle"
            name="bookTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div className="background-rectangle"></div>
        </div>
        <div className="input-group">
          <label className="label-member-detail" htmlFor="memberId">Member Email<br></br></label>
          <input
            id="memberId"
            name="memberId"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            type="email" 
            placeholder="Email"
          />
          <div className="background-rectangle"></div>
        </div>
        <button type="submit">Borrow</button>
      </form>
    </div>
  );
};