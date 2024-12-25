import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import './NavBar.css'; // Link to the Navbar CSS file

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo">NGOverse</div>
      <ul className="nav-links">
        {/*<li><Link to="/home" className="nav-link">Home</Link></li>*/} {/* Link to Home page */}
        <li><Link to="/" className="nav-link">About</Link></li> {/* Link to About Us page */}
        <li><Link to="/login" className="nav-link">Sign In</Link></li> {/* Link to Login page */}
      </ul>
    </nav>
  );
};

export default NavBar;
