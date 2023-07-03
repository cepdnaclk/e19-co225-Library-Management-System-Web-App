import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MemberBookReservation.css";
//import BookList from "./BookList";

const MemberBookReservation = () => {
  const [reservationData, setReservationData] = useState({
    memberId: "",
    memberName: "",
    bookTitle: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  //const [books, setBooks] = useState([]);
  //const [availableBooks, setAvailableBooks] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservationData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const navigate = useNavigate();

  
  const handleSearch = (e) => {
    e.preventDefault();

    // Navigate to the book search results page along with the reservation data
    navigate("/book-search-results", { state: { reservationData } });
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
        <div className="input-group">
          <label className="label-member-detail" htmlFor="memberId">Member ID<br></br></label>
          <input
            type="text"
            id="memberId"
            name="memberId"
            value={reservationData.memberId}
            onChange={handleInputChange}
            required
          />
          <div className="background-rectangle"></div>
        </div>
        <div className="input-group">
          <label className="label-member-detail" htmlFor="memberName">Member Name<br></br></label>
          <input
            type="text"
            id="memberName"
            name="memberName"
            value={reservationData.memberName}
            onChange={handleInputChange}
            required
          />
          <div className="background-rectangle"></div>
        </div>
        <button type="submit">Search</button>
      </form>
      
    </div>
  );
};

export default MemberBookReservation;