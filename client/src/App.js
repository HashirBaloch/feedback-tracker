import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !message) return;

    const newFeedback = { name, message };

    try {
      const res = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFeedback),
      });
      const data = await res.json();
      setFeedbackList([...feedbackList, data]);
      setName("");
      setMessage("");
    } catch (err) {
      console.error("Error submitting feedback:", err);
    }
  };

  const fetchFeedback = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/feedback");
      const data = await res.json();
      setFeedbackList(data);
    } catch (err) {
      console.error("Error fetching feedback:", err);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <div className="container">
      <h2>Feedback Tracker</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          rows="4"
          placeholder="Your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send Feedback</button>
      </form>

      <div className="feedback-list">
        {feedbackList.map((fb, index) => (
          <div key={index} className="feedback-item">
            <strong>{fb.name}</strong>
            <span>{fb.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
