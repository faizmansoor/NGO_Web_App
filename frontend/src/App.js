import React from "react";
import Navbar from "./components/Navbar";
import NgoDir from "./components/pages/NgoDir";
import Fund from "./components/pages/Fund";
import AddEvent from "./components/pages/AddEvent";
import AboutUs from "./components/pages/AboutUs";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import VoiceBot from "./components/VoiceBot";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  console.log("App component rendered");

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<AboutUs />} />
          <Route path="/NgoDir" element={<NgoDir />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/fund" element={<Fund />} />
          <Route path="/addevent" element={<AddEvent />} />
        </Routes>
        <VoiceBot />
      </div>
    </Router>
  );
};

export default App;
