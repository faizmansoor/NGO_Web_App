import React from 'react';
import { useNavigate } from 'react-router-dom';

const GetStartedButton = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <button className="get-started-button" onClick={handleGetStarted}>
      Browse
    </button>
  );
};

export default GetStartedButton;