import React from "react";
import "./Navbar.css";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="navbar-title">
          Ngoverse
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/fund">Create a Fundraiser</Link>
        </li>
        <li>
          <Link to="/addevent">Create an Event</Link>
        </li>
        <li><Link to="/NgoDir">NGO Directory</Link></li>
        <li><Link to="/login" className="nav-link">Sign In</Link></li> {/* Link to Login page */}
      </ul>
    </nav>
  );
};
export default Navbar;