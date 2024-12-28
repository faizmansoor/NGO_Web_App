// AboutUs.js
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
        <p>
        Welcome to NgoVerse! We are a forward-thinking platform committed to making a significant impact by connecting NGOs with individuals, businesses, and organizations eager to make a real difference. 
  Our vision is to cultivate a community of change-makers who share the common goal of addressing the world's most pressing social challenges. Through NgoVerse, we provide NGOs with the tools they need to raise awareness, increase visibility, and connect with like-minded supporters. 
  Whether you’re looking to donate, volunteer, or collaborate, we offer a space where people and organizations can work together to bring positive change to local and global communities.
        </p>
      </section>

      {/* Section 3: Our Vision */}
      <section className="vision-section">
        <h1>Our Vision</h1>
        <p>
        We envision a world where social impact organizations flourish and grow by collaborating with passionate individuals, businesses, and other entities. 
    Our platform seeks to amplify the voice of NGOs, enabling them to scale their efforts and make a lasting difference. We believe in a future where every cause, no matter how big or small, has the support it needs to thrive. 
    NgoVerse is driven by the belief that collective action, rooted in collaboration, can drive meaningful change across the globe. We are committed to building a world where the impact of social organizations can reach its full potential and benefit communities everywhere.
        </p>
      </section>

      {/* Section 4: Our Mission */}
      <section className="mission-section">
        <h1>Our Mission</h1>
        <p>
        Our mission is to bridge the gap between NGOs and the people who want to contribute to meaningful, long-lasting causes. We are passionate about providing an accessible platform that fosters connections, empowers organizations, and helps bring visibility to the vital work being done in every corner of the world.
    At NgoVerse, we believe that by facilitating these connections, we can help charitable organizations fulfill their mission more effectively and reach their full potential. We strive to empower individuals and businesses to engage with causes that matter to them, providing the resources they need to get involved and make a difference.
    Together, we can create a more compassionate, supportive world where every act of kindness counts.
  
        </p>
      </section>

      {/* Section 5: Contact Us */}
      <section className="contact-section">
        <h1>Contact Info</h1>
        
          <p><strong>Main Location:</strong> Ramaiah</p>
          <p><strong>Enrollment Phone:</strong> +91 9677866801</p>
          <p><strong>Student Phone:</strong> +91 9677866801</p>
          <p><strong>Enrollment Email:</strong> kushikks@gmail.com</p>
          <p><strong>Student Email:</strong> kushikks1ms23cs000@gmail.com</p>
        
      </section>
    </div>
  );
};

export default AboutUs;