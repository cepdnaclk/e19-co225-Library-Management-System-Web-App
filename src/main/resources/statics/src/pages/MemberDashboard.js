import React from 'react';
import './css/MemberDashboard.css';
import { useNavigate } from 'react-router-dom';

export const MemberDashboard = () => {

  const navigate = useNavigate();

  const navigateToCurrentBook = () => {
    // Code to navigate to the current book page
    console.log('Navigating to current book page');
    navigate('/member/current-book')
  };

  const navigateToSearchBook = () => {
    // Code to navigate to the search book page
    console.log('Navigating to search book page');
    navigate('/member/search-book')
  };

  return (
    <div className="dashboard">
      <div className="button" onClick={navigateToCurrentBook}>
        Current Book
      </div>
      <div className="button" onClick={navigateToSearchBook}>
        Search Book
      </div>
    </div>
  );
};
