import React, { useState } from 'react';
import './css/CurrentBook.css';
import { useNavigate } from 'react-router-dom';

export const CurrentBook = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    // Make the API call with the search query and update the search results state
    // Replace the code below with your actual API call
    const mockSearchResults = [
      { title: 'Book 1', author: 'Author 1' },
      { title: 'Book 2', author: 'Author 2' },
      { title: 'Book 3', author: 'Author 3' },
    ];

    setSearchResults(mockSearchResults);
  };

  const handleBack = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div>
      <div className="back-button" onClick={() => navigate('/member')}>
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
              <th>Title</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((result, index) => (
              <tr key={index}>
                <td>{result.title}</td>
                <td>{result.author}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};