import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddEvent.css";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events"); // Replace with your backend endpoint
        if (response.data.success) {
          setEvents(response.data.data);
        } else {
          setError("Failed to load events.");
        }
      } catch (err) {
        setError("Error fetching events: " + err.message);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    return (
      event.name.toLowerCase().includes(search.toLowerCase()) &&
      (locationFilter === "" ||
        event.location.toLowerCase().includes(locationFilter.toLowerCase()))
    );
  });

  return (
    <div className="eventlist-container">
      <div className="filter-container">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />
        <input
          type="text"
          placeholder="Filter by location..."
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="filter-box"
        />
      </div>
      <div className="cards-container">
        {error && <p className="error-message">{error}</p>}
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <div key={index} className="card">
              <h2>{event.name}</h2>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              <p>
                <strong>Description:</strong> {event.description}
              </p>
              <p>
                <strong>Organized by:</strong> {event.ngoName}
              </p>
            </div>
          ))
        ) : (
          <p className="no-results">No events found.</p>
        )}
      </div>
    </div>
  );
};

export default EventList;
