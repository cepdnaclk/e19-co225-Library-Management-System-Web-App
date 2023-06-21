import React from 'react';


const Header = () => {
    return (
        <div className="ui fixed menu">
            <div className="ui container">
            <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '10vh',
      }}
    >
                <h1 className="ui header red">Library Management System</h1>
            </div>
        </div>
        </div>
    );
};

export default Header;
