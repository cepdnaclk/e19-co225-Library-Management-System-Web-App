import React, { useState } from 'react';
import './MemberSearch.css';

const MemberSearch = () => {
  const [id, setId] = useState('');
  const [member, setMember] = useState(null);
  const [showContainer, setShowContainer] = useState(false);

  return (
    <div className={showContainer ? "container" : ""}>
      <div className="search-container">
        {showContainer && (
          <p className="message">Member Details</p>
        )}

        <div className="center-content">
          <p><b>Librarian Member Searching:</b></p>
          <input
            className="search-input"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter Member ID"
          />
          <button className="search-button">
            Search
          </button>
        </div>

        {member && (
          <div className="member-details">
            <h2>{member.firstName} {member.lastName}</h2>
            <p>Email: {member.email}</p>
            <p>Phone: {member.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberSearch;
