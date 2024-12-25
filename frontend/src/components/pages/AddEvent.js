import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddEvent.css";

const EventList = () => {
  const [formData, setFormData] = useState({
    event: "",
    participants: "",
    eligibility: "",
    location: "",
    description: "",
    volunteerLink: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setCards([...cards, formData]);

    setFormData({
      event: "",
      participants: "",
      eligibility: "",
      location: "",
      description: "",
      volunteerLink: "",
      image: null,
    });

    setShowForm(false);
  };
  const [cards, setCards] = useState([]);
  const [showForm, setShowForm] = useState(false);

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
    <div className="form-container">
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form" : "Create New Event"}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <h2>Event Registration</h2>
          <label htmlFor="event">Event Name</label>
          <input
            type="text"
            id="event"
            name="event"
            value={formData.event}
            onChange={handleChange}
            placeholder="Enter event name"
            required
          />
          <label htmlFor="participants">Number of Participants</label>
          <input
            type="number"
            id="participants"
            name="participants"
            value={formData.participants}
            onChange={handleChange}
            placeholder="Enter number of participants"
            min="0"
            required
          />
          <label htmlFor="eligibility">Eligibility Conditions</label>
          <textarea
            id="eligibility"
            name="eligibility"
            value={formData.eligibility}
            onChange={handleChange}
            placeholder="Enter eligibility conditions"
            required
          />
          <label htmlFor="location">Event Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter event location"
            required
          />
          <label htmlFor="description">Event Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter event description"
            required
          />
          <label htmlFor="volunteerLink">Volunteer Registration Link</label>
          <input
            type="url"
            id="volunteerLink"
            name="volunteerLink"
            value={formData.volunteerLink}
            onChange={handleChange}
            placeholder="Enter volunteer registration link"
            required
          />
          <label htmlFor="image">Upload Event Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}
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
    </div>
  );
};

export default EventList;
