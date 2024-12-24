import React, { useState } from 'react';
import './EventForm.css';

const EventForm = ({ addCard }) => {
  const [formData, setFormData] = useState({
    event: '',
    participants: '',
    eligibility: '',
    location: '',
    description: '',
    volunteerLink: '',
    image: null,
  });

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
    addCard(formData);
    setFormData({
      event: '',
      participants: '',
      eligibility: '',
      location: '',
      description: '',
      volunteerLink: '',
      image: null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
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
  );
};

export default EventForm;
