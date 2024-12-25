import React, { useState } from 'react';
import './Fund.css';

const Fund = () => {
  const [formData, setFormData] = useState({
    fundraiserLink: '',  
    description: '',     
    image: null,          
    qrCode: null          
  });

  const [cards, setCards] = useState([]);  
  const [showForm, setShowForm] = useState(false);  
  const [query, setQuery] = useState('');  

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' || name === 'qrCode') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setCards([...cards, formData]);

    setFormData({
      fundraiserLink: '',
      description: '',
      image: null,
      qrCode: null
    });

    setShowForm(false);
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const filteredCards = cards.filter(card =>
    card.fundraiserLink.toLowerCase().includes(query.toLowerCase()) ||
    card.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="form-container">
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Close Form' : 'Create a Fundraiser'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <h2>Fundraiser Registration</h2>

          <label htmlFor="fundraiserLink">Fundraiser Link</label>
          <input
            type="url"
            id="fundraiserLink"
            name="fundraiserLink"
            value={formData.fundraiserLink}
            onChange={handleChange}
            placeholder="Enter fundraiser link"
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

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search fundraisers..."
          value={query}
          onChange={handleSearch}
        />
      </div>

      {/* Render all filtered cards */}
      <div className="card-container">
        {filteredCards.map((card, index) => (
          <div className="card" key={index}>
            <p>
              <strong>Fundraiser Link:</strong>{' '}
              <a href={card.fundraiserLink} target="_blank" rel="noopener noreferrer">
                {card.fundraiserLink}
              </a>
            </p>
            <p><strong>Description:</strong> {card.description}</p>
            {card.image && (
              <img src={URL.createObjectURL(card.image)} alt="Fundraiser" />
            )}
            {card.qrCode && (
              <img src={URL.createObjectURL(card.qrCode)} alt="Fundraiser QR Code" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fund;
