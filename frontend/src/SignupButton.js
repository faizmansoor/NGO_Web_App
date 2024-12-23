import React from 'react';

const SignupButton = () => {
  const handleSignup = () => {
    window.location.href = '/signup'; // Adjust URL if needed
  };

  return (
    <button className="signup-button" onClick={handleSignup}>
      Sign Up
    </button>
  );
};

export default SignupButton;
