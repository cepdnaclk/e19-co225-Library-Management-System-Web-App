import React, { useState } from 'react';
import './css/MemberSearchBook.css';
import { useNavigate } from 'react-router-dom';

export const BorrowingSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    const token = localStorage.getItem('accessToken');
    
    fetch('http://localhost:8080/api/v1/borrowing', {
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
        //window.alert(error)
      });
  };

  const handleBack = () => {
    setSearchQuery('');
    setSearchResults([]);
    navigate('/member')
  };

  return (
    <div className="search-background">
      <div className="back-button" onClick={handleBack}>
        Back
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter book title"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      {searchResults.length > 0 && (
        <table className="search-results-table">
          <thead>
            <tr>
              <th>User Email</th>
              <th>Book Title</th>
              <th>Borrowing Date</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((result, index) => (
              <tr key={index}>
                <td>{result.userEmail}</td>
                <td>{result.bookTitle}</td>
                <td>{result.borrowedDate}</td>
                <td>{result.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
