import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NgoDir.css";

const NgoDir = () => {
  const [ngos, setNgos] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNGOs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/ngos");
        if (response.data.success) {
          setNgos(response.data.data);
        } else {
          setError("Failed to load NGOs.");
        }
      } catch (err) {
        setError("Error fetching NGOs: " + err.message);
      }
    };

    fetchNGOs();
  }, []);

  const filteredNgos = ngos.filter((ngo) => {
    return (
      ngo.name.toLowerCase().includes(search.toLowerCase()) &&
      (typeFilter === "" || ngo.ngoType === typeFilter) &&
      (locationFilter === "" ||
        ngo.address?.toLowerCase().includes(locationFilter.toLowerCase()))
    );
  });

  return (
    <div className="ngodir-container">
      <div className="filter-container">
        <span
          className="search-icon"
          style={{
            marginTop: "52px",
          }}
        >
          🔍
        </span>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Types</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
          <option value="Environment">Environment</option>
          <option value="Community">Community</option>
          <option value="Others">Others</option>
        </select>
        <input
          type="text"
          placeholder="Search by location..."
          style={{
            height: "41px",
            marginTop: "50px",
          }}
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="filter-box"
        />
      </div>
      <div className="cards-container">
        {error && <p className="error-message">{error}</p>}
        {filteredNgos.length > 0 ? (
          filteredNgos.map((ngo, index) => (
            <div key={index} className="card">
              <img
                src={ngo.picUrl}
                alt={`${ngo.name} Logo`}
                className="ngo-image"
              />
              <h2>{ngo.name}</h2>
              <p>
                <b>Contact:</b> {ngo.contactNo}
              </p>
              <p>
                <b>Type: </b>
                {ngo.ngoType}
              </p>
              <p>
                <b>Address: </b>
                {ngo.address}
              </p>
              <a
                href={ngo.websiteLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Website
              </a>
            </div>
          ))
        ) : (
          <p className="no-results">No NGOs found.</p>
        )}
      </div>
    </div>
  );
};

export default NgoDir;
