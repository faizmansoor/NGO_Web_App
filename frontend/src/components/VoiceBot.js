import React, { useEffect, useState } from "react";
import "./VoiceBot.css";
import { useNavigate } from "react-router-dom"; // React Router's navigate function

const VoiceBot = () => {
  const [isVoiceBotEnabled, setIsVoiceBotEnabled] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const navigate = useNavigate();

  // Define the tabs and their corresponding links
  const tabs = [
    { name: "NgoVerse", link: "/AboutUs" },
    { name: "Fundraisers", link: "/Fund" },
    { name: "NGO Directory", link: "/NgoDir" },
    { name: "NGO Events", link: "/AddEvent" },
    { name: "Sign In", link: "/SignupPage" },
  ];

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech Recognition API is not supported in this browser.");
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.lang = "en-US";

    recognitionInstance.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim();
      console.log("Recognized speech:", transcript);

      // Find the matching tab
      const matchedTab = tabs.find((tab) =>
        transcript.toLowerCase().includes(tab.name.toLowerCase())
      );

      if (matchedTab) {
        console.log(`Navigating to ${matchedTab.name}`);
        navigate(matchedTab.link);
      } else {
        console.log(`No matching tab found for "${transcript}".`);
      }
    };

    recognitionInstance.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    setRecognition(recognitionInstance);
  }, [navigate, tabs]);

  const toggleVoiceBot = () => {
    if (isVoiceBotEnabled) {
      recognition?.stop();
      console.log("Voice bot disabled.");
    } else {
      recognition?.start();
      console.log("Voice bot enabled.");
    }
    setIsVoiceBotEnabled(!isVoiceBotEnabled);
  };

  return (
    <div className="voicebot-container">
      {/* Toggle VoiceBot Button */}
      <button
        onClick={toggleVoiceBot}
        className="voicebot-toggle-button"
        style={{
          backgroundColor: isVoiceBotEnabled ? "#ff4d4d" : "#4caf50",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {isVoiceBotEnabled ? "Disable Voice Bot" : "Voice Bot"}
      </button>
    </div>
  );
};

export default VoiceBot;
