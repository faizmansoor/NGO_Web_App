import React, { useState } from 'react';
import './SignupPage.css'; // Link to the specific CSS for SignupPage
import NavBar from './NavBar';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    contact_number: '',
    fundraising_link: '',
    website_link: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send the data to the server)
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <NavBar />
      <div className="background-region">
        <div className="signup-page">
          <div className="signup-form-container"> {/* White container */}
            <h1 className="signup-title">Sign Up</h1>
            
            <form onSubmit={handleSubmit} className="signup-form">
              {/* Name Field */}
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

              {/* Email Field */}
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

              {/* Address Field */}
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

              {/* Contact Number Field */}
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

              {/* Fundraising Link Field */}
              <div className="form-group">
                <label htmlFor="fundraising_link">Fundraising Link</label>
                <input
                  type="url"
                  id="fundraising_link"
                  name="fundraising_link"
                  value={formData.fundraising_link}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              {/* Website Link Field */}
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

              {/* Submit Button */}
              <div className="form-group">
                <button
                  type="submit"
                  className="form-submit-button"
                >
                  Submit
                </button>
              </div>
            </form>
          </div> {/* End of white container */}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
