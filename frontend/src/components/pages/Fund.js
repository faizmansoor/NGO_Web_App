import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Fund.css";

const Fund = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    qrCodeUrl: "",
  });

  const [fundraisers, setFundraisers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("http://localhost:5000/check-auth", {
          withCredentials: true,
        });

        if (response.data.isAuthenticated) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();

    const fetchFundraisers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/fundraisers"
        );

        if (response.data.success) {
          setFundraisers(response.data.data);
        } else {
          setError("Failed to load fundraisers.");
        }
      } catch (err) {
        setError("Error fetching fundraisers: " + err.message);
      }
    };

    fetchFundraisers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/fundraisers",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setFundraisers([...fundraisers, response.data.data]);
        setShowForm(false);
        setFormData({
          name: "",
          description: "",
          imageUrl: "",
          qrCodeUrl: "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filteredFundraisers = fundraisers.filter(
    (fundraiser) =>
      fundraiser.name.toLowerCase().includes(query.toLowerCase()) ||
      fundraiser.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fund-container">
      {isAuthenticated && (
        <div className="form-btn">
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              height: "55px",
              marginTop: "30px",
            }}
            className="toggle-form-btn"
          >
            {showForm ? "Close Form" : "Create a Fundraiser"}
          </button>
        </div>
      )}

      {showForm && (
        <div className="magic-form">
          <form onSubmit={handleSubmit}>
            <h2>Fundraiser Registration</h2>

            <label htmlFor="name">Fundraiser Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter fundraiser name"
              required
            />

            <label htmlFor="description">Fundraiser Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter fundraiser description"
              required
            />

            <label htmlFor="imageUrl">Fundraiser Image URL</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Enter image URL"
              required
            />

            <label htmlFor="qrCodeUrl">QR Code URL</label>
            <input
              type="url"
              id="qrCodeUrl"
              name="qrCodeUrl"
              value={formData.qrCodeUrl}
              onChange={handleChange}
              placeholder="Enter QR code image URL"
              required
            />

            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      <div className="search-container">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search fundraisers..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: "80%" }}
        />
      </div>

      <div className="card-container">
        {error && <p className="error-message">{error}</p>}
        {filteredFundraisers.map((fundraiser, index) => (
          <div className="card" key={index}>
            <h3>{fundraiser.name}</h3>
            <p>{fundraiser.description}</p>
            {fundraiser.imageUrl && (
              <img src={fundraiser.imageUrl} alt="Fundraiser" />
            )}
            {fundraiser.qrCodeUrl && (
              <img src={fundraiser.qrCodeUrl} alt="QR Code" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fund;
