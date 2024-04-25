import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStop, faFileUpload, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faUser, faRobot } from '@fortawesome/free-solid-svg-icons'; // Import user and robot icons
import './App.css'; // Import CSS file for styling

function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordButtonColor, setRecordButtonColor] = useState(''); // State for button color

  const handleMessageSend = () => {
    if (inputValue.trim() === "") return;
    setMessages(prevMessages => [...prevMessages, { text: inputValue, sender: "user" }]);
    setMessages(prevMessages => [...prevMessages, { text: inputValue, sender: "bot" }]); // Echo back user's message
    setInputValue(""); // Clear input field
  };

  



  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    console.log("Uploaded file:", file);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleMessageSend();
    }
  };

  const handleVoiceRecording = () => {
    if (!isRecording) {
      // Start recording
      const recognition = new window.webkitSpeechRecognition(); // Using Web Speech API
      recognition.lang = 'en-US';
      recognition.start();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsRecording(false);
        setRecordButtonColor(''); // Reset button color
      };
      recognition.onend = () => {
        setIsRecording(false);
        setRecordButtonColor(''); // Reset button color
      };
      setIsRecording(true);
      setRecordButtonColor('red'); // Change button color to red when recording starts
    } else {
      // Stop recording
      setIsRecording(false);
      setRecordButtonColor(''); // Reset button color
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.sender === "user" && (
              <FontAwesomeIcon icon={faUser} className="message-icon" />
            )}
            {message.sender === "bot" && (
              <FontAwesomeIcon icon={faRobot} className="message-icon" />
            )}
            <div className="message-text">{message.text}</div>
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress} // Add keypress event listener
          placeholder="Type your message..."
          className="input-field" // Added class for styling
        />
        {inputValue.trim() !== '' && (
          <button onClick={handleMessageSend} className="send-button">
            <FontAwesomeIcon icon={faPaperPlane} /> {/* Icon for send button */}
          </button>
        )}
        {!isRecording && inputValue.trim() === '' && (
          <button onClick={handleVoiceRecording} className="record-button" style={{ backgroundColor: recordButtonColor }}>
            <FontAwesomeIcon icon={faMicrophone} />
          </button>
        )}
        {isRecording && (
          <button onClick={handleVoiceRecording} className="record-button" style={{ backgroundColor: recordButtonColor }}>
            <FontAwesomeIcon icon={faStop} />
          </button>
        )}
        <label className="upload-button">
          <input type="file" onChange={handleDocumentUpload} accept=".pdf,.doc,.docx,.png,.jpg" />
          <FontAwesomeIcon icon={faFileUpload} />
        </label>
      </div>
    </div>
  );
}

export default Chatbot;
