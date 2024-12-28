import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="main-container">
      {/* Section 1: Video with title */}
      <section className="video-section">
        <video src="/videos/videof.mp4" autoPlay loop muted playsInline />
        <div className="overlay">
          <h1 className="ngoverse-title">NgoVerse</h1>
        </div>
      </section>

      {/* Section 2: About Us */}
      <section className="about-us-section">
        <h1>About Us</h1>
        <p style={{ color: '#333', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
          Welcome to NgoVerse! We are a forward-thinking platform committed to making a significant impact by connecting NGOs with individuals, businesses, and organizations eager to make a real difference in the world. Our goal is to create a seamless and efficient ecosystem where NGOs can easily collaborate and engage with like-minded individuals and organizations. Whether you're an NGO looking for support or someone passionate about contributing to a good cause, NgoVerse is the place to connect, collaborate, and make a difference.
        </p>
      </section>

      {/* Section 3: Our Vision */}
      <section className="vision-section">
        <h1>Our Vision</h1>
        <p style={{ color: '#dddddd', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
          We envision a world where social impact organizations flourish and grow by collaborating with passionate individuals, businesses, and other organizations. Our vision is to empower NGOs to reach their full potential by providing them with the tools, resources, and partnerships they need to create lasting positive change in the world.
        </p>
      </section>

      {/* Section 4: Our Mission */}
      <section className="mission-section">
        <h1>Our Mission</h1>
        <p style={{ color: '#333', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
          Our mission is to bridge the gap between NGOs and the people who want to contribute to meaningful causes. By providing a platform for easy connection, we aim to inspire individuals and organizations to take action, collaborate, and make a tangible impact on the communities that need it most. Together, we can build a better world.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
