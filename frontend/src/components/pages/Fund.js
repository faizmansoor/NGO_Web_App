import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Fund.css";

const Fund = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    qrCode: null,
  });

  const [fundraisers, setFundraisers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFundraisers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/fundraisers");
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
    const { name, value, files } = e.target;
    if (name === "image" || name === "qrCode") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("image", formData.image);
    form.append("qrCodeImage", formData.qrCode);

    try {
      const response = await axios.post("http://localhost:5000/api/fundraisers", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setFundraisers([...fundraisers, response.data.data]);
        setShowForm(false);
        setFormData({ name: "", description: "", image: null, qrCode: null });
      }
    } catch (err) {
      setError("Error submitting fundraiser: " + err.message);
    }
  };

  const filteredFundraisers = fundraisers.filter(
    (fundraiser) =>
      fundraiser.name.toLowerCase().includes(query.toLowerCase()) ||
      fundraiser.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fund-container">
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form" : "Create a Fundraiser"}
      </button>

      {showForm && (
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

          <label htmlFor="image">Upload Fundraiser Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />

          <label htmlFor="qrCode">Upload QR Code for Fundraiser</label>
          <input
            type="file"
            id="qrCode"
            name="qrCode"
            accept="image/*"
            onChange={handleChange}
            required
          />

          <button type="submit">Submit</button>
        </form>
      )}

      <div className="search-container">
        <input
          type="text"
          placeholder="Search fundraisers..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="card-container">
        {error && <p className="error-message">{error}</p>}
        {filteredFundraisers.map((fundraiser, index) => (
          <div className="card" key={index}>
            <h3>{fundraiser.name}</h3>
            <p>{fundraiser.description}</p>
            {fundraiser.image && (
              <img src={`/${fundraiser.image}`} alt="Fundraiser" />
            )}
            {fundraiser.qrCodeImage && (
              <img src={`/${fundraiser.qrCodeImage}`} alt="QR Code" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fund;
