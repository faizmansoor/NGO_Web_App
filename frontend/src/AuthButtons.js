import React from 'react';
import SignupButton from './SignupButton';
import GetStartedButton from './GetStartedButton';
import './AuthButtons.css';  // Add custom styles for AuthButtons if needed

const AuthButtons = () => {
  return (
    <div className="auth-buttons-container">
        <SignupButton />
        <GetStartedButton />
    </div>
  );
};

export default AuthButtons;
