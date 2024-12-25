import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import AboutUs from './AboutUs';
import SignupPage from './SignupPage'; // Create this if it doesn't exist yet
import HomePage from './HomePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for home page */}
          <Route path="/home" element={<HomePage />} /> 
          
          {/* Route for signup page */}
          <Route path="/signup" element={<SignupPage />} />

          {/* Route for home page */}
          <Route path="/login" element={<Login />} /> 

          {/* Route for about us page */}
          <Route path="/" element={<AboutUs />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;


