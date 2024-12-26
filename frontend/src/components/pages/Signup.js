import React, { useState } from "react";
import "./authPages.css"; // Link to the specific CSS for SignupPage
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
    ngo_picture: null, // For file upload (image)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/ngos/register",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // This ensures the cookie is set
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
        ngo_picture: null,
      });
      // Redirect or display success message
    } catch (error) {
      console.error(
        "Error registering NGO:",
        error.response?.data || error.message
      );
      // Handle errors here (e.g., show error message)
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
            <label htmlFor="ngo_picture">NGO Picture</label>
            <input
              type="file"
              id="ngo_picture"
              name="ngo_picture"
              onChange={handleFileChange}
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
