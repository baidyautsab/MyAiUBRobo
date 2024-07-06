import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/LlamaChat.css";
import { BsSend } from "react-icons/bs";

const LlamaChat = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDots, setLoadingDots] = useState("");

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingDots((prevDots) =>
          prevDots.length < 3 ? prevDots + "." : ""
        );
      }, 500);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleButtonClick = () => {
    if (prompt.trim() === "") return;

    // Add the user's prompt to the messages array
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", text: prompt },
    ]);

    setLoading(true);
    axios
      .get(`http://localhost:8080/myAi/prompt?prompt=${prompt}`)
      .then((res) => {
        console.log(res.data); // Log the response for debugging

        // Add the API response to the messages array
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "response", text: res.data },
        ]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    // Clear the prompt input
    setPrompt("");
  };

  return (
    <div className="layer1">
      <div className="card">
        <h2>Ask Me Anything</h2>
        <div className="chat-box">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              <p>{message.text}</p>
            </div>
          ))}
          {loading && (
            <div className="message response">
              <p>Loading{loadingDots}</p>
            </div>
          )}
        </div>
        <div className="input-container">
          <div className="input-wrapper">
            <input
              className="input-field"
              type="text"
              value={prompt}
              onChange={handleInputChange}
              placeholder="Type your question here"
            />
            <button className="send-button" onClick={handleButtonClick}>
              <BsSend className="icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LlamaChat;
