import React, { useState } from "react";
import "./authPages.css";
import Navbar from "../Navbar";
import axios from "axios";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact_number: "",
    address: "",
    ngo_type: "",
    website_link: "",
    ngo_picture_url: "", // Changed to store image URL instead of file
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/ngos/register",
        formData, // Now sending regular JSON instead of FormData
        {
          headers: {
            "Content-Type": "application/json", // Changed to JSON content type
          },
          withCredentials: true,
        }
      );

      console.log("Registration successful:", response.data);
      setFormData({
        name: "",
        email: "",
        password: "",
        contact_number: "",
        address: "",
        ngo_type: "",
        website_link: "",
        ngo_picture_url: "",
      });
      // Redirect or display success message
    } catch (error) {
      console.error(
        "Error registering NGO:",
        error.response?.data || error.message
      );
      // Handle errors here
    }
  };

  return (
    <div>
      <Navbar />
      <div className="background-region">
        <form onSubmit={handleSubmit} className="signup-form">
          <h1 className="signup-title">Sign Up</h1>

          <div className="form-group">
            <label htmlFor="name">NGO Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact_number">Contact Number</label>
            <input
              type="text"
              id="contact_number"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ngo_type">NGO Type</label>
            <select
              id="ngo_type"
              name="ngo_type"
              value={formData.ngo_type}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select Type</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Environment">Environment</option>
              <option value="Community">Community</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="website_link">Website Link</label>
            <input
              type="url"
              id="website_link"
              name="website_link"
              value={formData.website_link}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ngo_picture_url">NGO Picture URL</label>
            <input
              type="url"
              id="ngo_picture_url"
              name="ngo_picture_url"
              value={formData.ngo_picture_url}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <button type="submit" className="form-submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;