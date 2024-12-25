import React, { useState } from "react";
import "./NgoDir.css";

const ngos = [
  { name: "Education NGO", contact: "1234567890", link: "https://educationngo.org", type: "Education", location: "Urban" },
  { name: "Healthcare NGO", contact: "0987654321", link: "https://healthcarengo.org", type: "Healthcare", location: "Rural" },
  { name: "Environment NGO", contact: "1112223334", link: "https://environmentngo.org", type: "Environment", location: "Urban" },
];

const NgoDir = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const filteredNgos = ngos.filter((ngo) => {
    return (
      ngo.name.toLowerCase().includes(search.toLowerCase()) &&
      (typeFilter === "" || ngo.type === typeFilter) &&
      (locationFilter === "" || ngo.location === locationFilter)
    );
  });

  return (
    <div className="ngodir-container">
      <div className="filter-container">
      <span className="search-icon">🔍</span> 
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
          <option value="Education">Education</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Environment">Environment</option>
        </select>
        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Locations</option>
          <option value="Urban">Urban</option>
          <option value="Rural">Rural</option>
        </select>
      </div>
      <div className="cards-container">
        {filteredNgos.length > 0 ? (
          filteredNgos.map((ngo, index) => (
            <div key={index} className="card">
              <h2>{ngo.name}</h2>
              <p>Contact: {ngo.contact}</p>
              <p>Type: {ngo.type}</p>
              <p>Location: {ngo.location}</p>
              <a href={ngo.link} target="_blank" rel="noopener noreferrer">Visit Website</a>
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