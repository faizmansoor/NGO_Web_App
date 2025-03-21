import React, { useState } from "react";
import "./authPages.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/ngos/login`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log("Login successful:", response.data);

      navigate("/NgoDir");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div>
      <div
        className="background-region"
        style={{
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          color: "#fff",
          fontSize: "100px",
          height: "100vh",
          minHeight: "100vh",
        }}
      >
        <div>
          <div className="login-container">
            <form
              className="signup-form"
              onSubmit={handleSubmit}
              style={{
                backgroundColor: "#ffffff",
              }}
            >
              <h2>NGO Login</h2>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button className="login-button signup-button" type="submit">
                Login
              </button>
            </form>
          </div>

          <div className="auth-buttons-container">
            <Link to="/signup">
              <button className="signup-button">Sign Up</button>
            </Link>
            <Link to="/NgoDir">
              <button className="get-started-button">Browse</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
