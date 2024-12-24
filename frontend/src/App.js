import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    event: '',
    participants: '',
    eligibility: '',
    location: '',
    description: '',
    volunteerLink: '',
    image: null,
  });

  const [cards, setCards] = useState([]); // State to store multiple cards
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add the current formData to the cards list
    setCards([...cards, formData]);

    // Reset the form for new input
    setFormData({
      event: '',
      participants: '',
      eligibility: '',
      location: '',
      description: '',
      volunteerLink: '',
      image: null,
    });

    // Hide the form after submission
    setShowForm(false);
  };

  return (
    <div className="form-container">
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Close Form' : 'Create New Event'}
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

      {/* Render all cards */}
      <div className="cards-container">
        {cards.map((card, index) => (
          <div className="card" key={index}>
            <h3>{card.event}</h3>
            <p><strong>Participants:</strong> {card.participants}</p>
            <p><strong>Eligibility:</strong> {card.eligibility}</p>
            <p><strong>Location:</strong> {card.location}</p>
            <p><strong>Description:</strong> {card.description}</p>
            <p>
              <strong>Volunteer Link:</strong>{' '}
              <a href={card.volunteerLink} target="_blank" rel="noopener noreferrer">
                Register Here
              </a>
            </p>
            {card.image && (
              <img src={URL.createObjectURL(card.image)} alt="Event" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
