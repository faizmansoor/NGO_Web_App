import React from 'react';

const GetStartedButton = () => {
  const handleGetStarted = () => {
    window.location.href = '/get-started'; // Replace with your URL later
  };

  return (
    <button className="get-started-button" onClick={handleGetStarted}>
      Get Started
    </button>
  );
};

export default GetStartedButton;
