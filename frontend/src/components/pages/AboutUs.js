import React, { useEffect, useState } from "react";
import "./AboutUs.css";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    about: false,
    vision: false,
    mission: false,
  });

  const buttonStylePrimary = {
    backgroundColor: "#4361ee",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
  };

  const buttonStyleSecondary = {
    backgroundColor: "#3f37c9",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
  };

  useEffect(() => {
    setIsVisible((prev) => ({ ...prev, hero: true }));

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    const sections = document.querySelectorAll(".animate-section");
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="homepage-container" style={{ marginTop: "0px" }}>
      <section className={`hero-section ${isVisible.hero ? "visible" : ""}`}>
        <div className="hero-content">
          <h1 className="hero-title">NgoVerse</h1>
          <p className="hero-subtitle">Connecting Causes with Communities</p>
          <div className="hero-buttons">
            <button style={buttonStylePrimary} className="primary-button">
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                  width: "100%",
                  height: "100%",
                }}
              >
                Get Started
              </Link>
            </button>
          </div>
        </div>
      </section>

      <section
        id="about"
        className={`about-section animate-section ${
          isVisible.about ? "visible" : ""
        }`}
      >
        <div className="section-content">
          <h2 className="section-title">Who We Are</h2>
          <div className="divider"></div>
          <p className="section-text">
            NgoVerse is a digital ecosystem where nonprofits and change-makers
            come together. We leverage technology to amplify social impact,
            connecting organizations with the resources, volunteers, and
            supporters they need to thrive in an increasingly digital world.
          </p>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3>Connect</h3>
              <p>Find the right partners for your mission</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Collaborate</h3>
              <p>Work together on meaningful projects</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3>Create</h3>
              <p>Build solutions for lasting change</p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="vision"
        className={`vision-section animate-section ${
          isVisible.vision ? "visible" : ""
        }`}
      >
        <div className="section-content">
          <h2 className="section-title light">Our Vision</h2>
          <div className="divider light"></div>
          <p className="section-text">
            We envision a world where every nonprofit organization has access to
            the digital tools and human connections needed to scale their
            impact. By breaking down silos between sectors and facilitating
            meaningful partnerships, we're building a more collaborative and
            effective social impact ecosystem.
          </p>
          <div className="vision-stats">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Organizations</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5000+</span>
              <span className="stat-label">Volunteers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Countries</span>
            </div>
          </div>
        </div>
      </section>

      <section
        id="mission"
        className={`mission-section animate-section ${
          isVisible.mission ? "visible" : ""
        }`}
      >
        <div className="section-content">
          <h2 className="section-title">Our Mission</h2>
          <div className="divider"></div>
          <p className="section-text">
            Our mission is to empower nonprofits through technology and
            community. We provide a platform that simplifies collaboration,
            amplifies reach, and maximizes impact for social good organizations
            of all sizes. By connecting passionate individuals with worthy
            causes, we're creating a ripple effect of positive change.
          </p>
          <div className="cta-container">
            <h3>Ready to make an impact?</h3>
            <button style={buttonStylePrimary} className="primary-button">
              Join NgoVerse Today
            </button>
          </div>
        </div>
      </section>

      <footer className="homepage-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>NgoVerse</h3>
            <p>© 2025 NgoVerse. All rights reserved.</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Platform</h4>
              <ul>
                <li>
                  <a href="#">How It Works</a>
                </li>
                <li>
                  <a href="#">For Organizations</a>
                </li>
                <li>
                  <a href="#">For Volunteers</a>
                </li>
                <li>
                  <a href="#">Pricing</a>
                </li>
              </ul>
            </div>
            <div className="link-group">
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>
            <div className="link-group">
              <h4>Connect</h4>
              <ul>
                <li>
                  <a href="#">Twitter</a>
                </li>
                <li>
                  <a href="#">LinkedIn</a>
                </li>
                <li>
                  <a href="#">Instagram</a>
                </li>
                <li>
                  <a href="#">Facebook</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
