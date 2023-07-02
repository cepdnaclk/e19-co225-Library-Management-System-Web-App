import React, { useState, useEffect } from 'react';
import './css/MemberSearchBook.css';
import { useNavigate } from 'react-router-dom';

export const CurrentBook = () => {

    useEffect(() => {
        handleSearch();
      }, []);

  const [searchResults, setSearchResults] = useState('');

  const navigate = useNavigate();

  const handleSearch = () => {
    const token = localStorage.getItem('accessToken');
    const email = localStorage.getItem('email');

    console.log(email);
    
    fetch('http://localhost:8080/api/v1/borrowing/' + email, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        // Save the data in the array
        setSearchResults(data);
        console.log(data);
      })
      .catch(error => {
        window.alert(error)
      });
  };

  const handleBack = () => {
    setSearchResults([]);
    navigate('/member')
  };

  return (
    <div>
      <div className="back-button" onClick={handleBack}>
        Back
      </div>
        <table className="search-results-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Book Title</th>
              <th>Borrowed Date</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            <td>{searchResults.userEmail}</td>
            <td>{searchResults.bookTitle}</td>
            <td>{searchResults.borrowedDate}</td>
            <td>{searchResults.dueDate}</td>
          </tbody>
        </table>
    </div>
  );
};