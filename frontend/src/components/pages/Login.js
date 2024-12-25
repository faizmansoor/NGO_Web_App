import React from "react";
import "./authPages.css";
import Navbar from "../Navbar"; // Import the Navbar component
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar /> {/* Add the Navbar component here */}
      <div className="background-region">
        <div>
          <div className="login-container">
            <form className="signup-form ">
              <h2>NGO Login</h2>
              <input type="text" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <button className="login-button signup-button" type="submit">Login</button>
            </form>
          </div>

          <div className="auth-buttons-container">
            <Link to="/signup">
              <button className="signup-button" onClick={navigate("/signup")}>
                Sign Up
              </button>
            </Link>
            <Link to="/NgoDir">
              <button
                className="get-started-button"
                onClick={navigate("/NgoDir")}
              >
                Browse
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
