import React from 'react';
import './EventCard.css';

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <h3>{event.event}</h3>
      <p><strong>Participants:</strong> {event.participants}</p>
      {/* Other event details here */}
      {event.image && <img src={URL.createObjectURL(event.image)} alt="Event" />}
    </div>
  );
};

export default EventCard;
