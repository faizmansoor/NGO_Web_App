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
    
  });

  const [cards, setCards] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");

  // Fetch events and authentication status
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("http://localhost:5000/check-auth", {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        setIsAuthenticated(response.data.isAuthenticated);
        setUserId(response.data.userId);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();

    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events");
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const dataToSend = { ...formData };
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/events",
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json", // Use application/json
          },
          withCredentials: true,
        }
      );
  
      if (response.data.success) {
        setCards([...cards, formData]);
        setFormData({
          event: "",
          location: "",
          description: "",
          participants: "",
          eligibility: "",
          volunteerLink: "",
        });
        setShowForm(false);
        console.log("Event created successfully.");
      } else {
        setError("Failed to create event.");
      }
    } catch (err) {
      setError("Error submitting event: " + err.message);
    }
  };
  const handleDelete = async (eventId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/events/${eventId}`, {
        withCredentials: true, // Ensure cookies are sent with the request
      });

      if (response.data.success) {
        setEvents(events.filter((event) => event._id !== eventId)); // Remove the event from the list
        console.log("Event deleted successfully.");
        window.location.href = "http://localhost:3000/addevent";
      } else {
        console.log("deleting");
        window.location.href = "http://localhost:3000/addevent";
      }
    } catch (err) {
      console.log("No access")
    }
  };

  const filteredEvents = events.filter((event) => {
    return (
      event.name.toLowerCase().includes(search.toLowerCase()) &&
      (locationFilter === "" ||
        event.location.toLowerCase().includes(locationFilter.toLowerCase()))
    );
  });

  
return (
  <div className="form-container">
    {isAuthenticated && (
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form" : "Create New Event"}
      </button>
    )}

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
          style={{
            height: "35%",
          }}
          className="search-box"
        />
        <input
          type="text"
          placeholder="Search by location..."
          style={{
            height: "42px",
            border: "2px solid #000000",
             borderRradius: "4px",
             boxShadow: "none",
          }}
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          onFocus={(e) => (e.target.style.border = "2px solid blue")}
          onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
          className="filter-box"
        />
      </div>

      <div className="cards-container">
        {error && <p className="error-message">{error}</p>}
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <div key={index} className="card">
              <h2>{event.name}</h2>
              <p><strong><b>Organized by:</b></strong> {event.ngoName}</p>
              <p>{event.location}</p>
              <p>{event.description}</p>
              {event.volunteerLink && (
                <p style={{ fontWeight: "bold" }}>
                  <a
                    href={event.volunteerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register here
                  </a>
                </p>
              )}
            {event.ngoId === userId && (
<button
  style={{
    all: "unset", // Reset all styles
    position: "absolute",  // Absolute position within the card container
    top: "10px", // Adjust top position within the card
    right: "10px", // Adjust right position within the card
    width: "30px",  // Smaller size
    height: "30px", // Same width and height for a perfect circle
    borderRadius: "50%",
    backgroundColor: "darkgreen",
    color: "white",
    fontSize: "18px", // Smaller "X"
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  }}
  onMouseEnter={(e) => e.target.style.backgroundColor = "darkgreen"}
  onMouseLeave={(e) => e.target.style.backgroundColor = "darkgreen"}
  onClick={() => handleDelete(event._id)}
>
  X
</button>
)}
              
              
              
              
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
