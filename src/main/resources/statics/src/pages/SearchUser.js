import React, { useState } from 'react';
import './css/MemberSearchBook.css';
import { useNavigate } from 'react-router-dom';

export const UserSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    const token = localStorage.getItem('accessToken');
    
    fetch('http://192.168.8.110:8080/api/v1/library', {
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
    setSearchQuery('');
    setSearchResults([]);
    navigate('/librarian')
  };

  return (
    <div>
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
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Birthday</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((result, index) => (
              <tr key={index}>
                <td>{result.id}</td>
                <td>{result.firstname}</td>
                <td>{result.lastname}</td>
                <td>{result.address}</td>
                <td>{result.email}</td>
                <td>{result.contact}</td>
                <td>{result.birthday}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};