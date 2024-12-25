import React from 'react';
import './HomePage.css'; // Make sure to link the updated CSS file
import NavBar from './NavBar';

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <div className="home-page">
        {/* Search Bar */}
        <div className="search-bar-container">
          <input type="text" className="search-bar" placeholder="Search" />
        </div>

        {/* Containers */}
        <div className="ngo-container">
          <div className="ngo-box">NGO 1</div>
          <div className="ngo-box">NGO 2</div>
          <div className="ngo-box">NGO 3</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
