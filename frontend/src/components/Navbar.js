import React from "react";
import "./Navbar.css";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      
      <ul className="navbar-links">
      <li><Link to="/" className="navbar-title">
          NgoVerse
        </Link>
          
        </li>
        <li>
          <Link to="/fund">Fundraisers</Link>
        </li>
        <li>
          <Link to="/addevent">NGO Events</Link>
        </li>
        <li><Link to="/NgoDir">NGO Directory</Link></li>
        <li><Link to="/login" className="nav-link">Sign In</Link></li> {/* Link to Login page */}
      </ul>
    </nav>
  );
};
export default Navbar;