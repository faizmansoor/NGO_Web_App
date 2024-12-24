import React, { useState } from 'react';
import './App.css';
import EventForm from './components/EventForm/EventForm';
import EventCard from './components/EventCard/EventCard';

const App = () => {
  const [cards, setCards] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const addCard = (formData) => {
    setCards([...cards, formData]);
  };

  return (
    <div className="form-container">
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Close Form' : 'Create New Event'}
      </button>

      {showForm && <EventForm addCard={addCard} />}

      <div className="cards-container">
        {cards.map((card, index) => (
          <EventCard key={index} event={card} />
        ))}
      </div>
    </div>
  );
};

export default App;
