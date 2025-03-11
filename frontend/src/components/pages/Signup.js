import React, { useState } from "react";
import "./authPages.css";

import axios from "axios";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact_number: "",
    address: "",
    ngoType: "",
    websiteLink: "",
    picUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending form data:", formData);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/ngos/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(formData);
      console.log("Registration successful:", response.data);
      setFormData({
        name: "",
        email: "",
        password: "",
        contact_number: "",
        address: "",
        ngoType: "",
        websiteLink: "",
        picUrl: "",
      });
    } catch (error) {
      console.error(
        "Error registering NGO:",
        error.response?.data || error.message
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
          fontSize: "100px",
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="signup-form"
          style={{
            backgroundColor: "#ffffff",
          }}
        >
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
              style={{
                width: "100%",
                height: "40px",
                padding: "10px",
              }}
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
              style={{
                width: "100%",
                height: "40px",
                padding: "10px",
              }}
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
              style={{
                width: "100%",
                height: "40px",
                padding: "10px",
              }}
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
              style={{
                width: "100%",
                height: "40px",
                padding: "10px",
              }}
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
              style={{
                width: "223px",
                height: "10px",
                padding: "10px",
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="ngoType">NGO Type</label>
            <select
              id="ngoType"
              name="ngoType"
              value={formData.ngoType}
              onChange={handleChange}
              className="form-input"
              style={{
                width: "223px",

                height: "40px",
                padding: "10px",
              }}
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
            <label htmlFor="websiteLink">Website Link</label>
            <input
              type="url"
              id="websiteLink"
              name="websiteLink"
              value={formData.websiteLink}
              onChange={handleChange}
              className="form-input"
              style={{
                width: "100%",
                height: "40px",
                padding: "10px",
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="picUrl">NGO Picture URL</label>
            <input
              type="url"
              id="picUrl"
              name="picUrl"
              value={formData.picUrl}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="form-input"
              style={{
                width: "100%",
                height: "40px",
                padding: "10px",
              }}
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
