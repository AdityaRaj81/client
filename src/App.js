import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', message: ''
  });

  const [loading, setLoading] = useState(false); // NEW

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple frontend validation
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    if (formData.phone.length < 10) {
      alert("Phone number must be at least 10 digits.");
      return;
    }

    setLoading(true); // Start loading state

    try {
      const res = await fetch('https://contact-form-backend-81l6.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "Message sent!");
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        alert(data.message || "Something went wrong.");
      }

    } catch (err) {
      alert("Network error. Please try again.");
    }

    setLoading(false); // End loading state
  };

  return (
    <div className="form-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Name"
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="Phone"
        />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Email"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message (optional)"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default App;
