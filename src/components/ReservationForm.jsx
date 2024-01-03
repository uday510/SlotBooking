import React, { useState } from 'react';
import './ReservationForm.module.css'; // Import the CSS file

const ReservationForm = ({ handleReservation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleReservation(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
      <button type="submit">Reserve Slot</button>
    </form>
  );
};

export default ReservationForm;
