import React from 'react';
import './Login.css';
import AuthButtons from './AuthButtons';  // Import the new component

const Login = () => {
  return (
    <div>
      <div className="login-container">
        <form className="login-form">
          <h2>NGO Login</h2>
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>

      <div className="auth-buttons-container">
        <AuthButtons />
      </div>
    </div>
  );
};

export default Login;
