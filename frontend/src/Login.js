import React from 'react';
import './Login.css';
import NavBar from './NavBar';  // Import the Navbar component
import AuthButtons from './AuthButtons';  // Import the new component

const Login = () => {
  return (
    <div>
      <NavBar />  {/* Add the Navbar component here */}
      <div className="background-region">
        <div>
          <div className="login-container">
            <form className="login-form">
              <h2>NGO Login</h2>
              <input type="text" placeholder="Username" required />
              <input type="password" placeholder="Password" required />
              <button type="submit">Login</button>
            </form>
          </div>
          <AuthButtons />
        </div>
      </div>
    </div>
  );
};

export default Login;
