import React from 'react';
import SignupButton from './SignupButton';
import GetStartedButton from './GetStartedButton';
import { Link } from 'react-router-dom';
import './AuthButtons.css';  // Add custom styles for AuthButtons if needed

const AuthButtons = () => {
  return (
    <div className="auth-buttons-container">
        <Link to="/signup">
          <SignupButton />
        </Link>
        <Link to="/">
          <GetStartedButton />
        </Link>
    </div>
  );
};

export default AuthButtons;