import React, { useState } from 'react';
import './css/MemberSearchBook.css';
import { useNavigate } from 'react-router-dom';

export const LibrarianSearchBook = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    const token = localStorage.getItem('accessToken');
    
    fetch('http://localhost:8080/api/v1/book', {
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
              <th>ISBN</th>
              <th>Title</th>
              <th>Author</th>
              <th>Publication Year</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((result, index) => (
              <tr key={index}>
                <td>{result.isbn}</td>
                <td>{result.title}</td>
                <td>{result.author}</td>
                <td>{result.pub_year}</td>
                <td>{(result.available) ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};