import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.phone.length < 10) {
      alert("Phone number must be at least 10 digits.");
      return;
    }

    try {
      const res = await fetch('https://contact-form-backend-81l6.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      alert(data.message || "Message sent!");
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (err) {
      alert("Something went wrong.");
    }
  };

  return (
    <div className="form-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} required placeholder="Name" />
        <input name="phone" value={formData.phone} onChange={handleChange} required placeholder="Phone" />
        <input name="email" value={formData.email} onChange={handleChange} required placeholder="Email" />
        <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message (optional)" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
