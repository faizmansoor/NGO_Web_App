import React from 'react';
import Navbar from '../Navbar';
import './AboutUs.css'; // Import the CSS file for About Us styling

const AboutUs = () => {
  return (
    <div className="home-container">
      <Navbar />
      <video src='/videos/videof.mp4' autoPlay loop muted playsInline />
      <div className="about-us-content">
        <h1>About Us</h1>
        <p>
          Welcome to NGOverse! We are dedicated to connecting NGOs with people who want to make a difference.
          Our platform helps raise awareness and fosters collaboration to tackle social challenges.
        </p>
        <section className="mission">
          <h1>Our Mission</h1>
          <p>
            Our mission is to create a bridge between NGOs and individuals or organizations that want to contribute
            to meaningful causes. By providing easy access to NGOs, we strive to empower charitable organizations to
            reach their full potential in their respective fields.
          </p>
        </section>
        <section className="vision">
          <h1>Our Vision</h1>
          <p>
            We envision a world where social impact organizations can thrive by working together with passionate
            individuals. We aim to support NGOs in their efforts to create lasting change in communities worldwide.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
