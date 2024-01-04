import React, { useState } from 'react';
import styles from './ReservationForm.module.css';
import axios from 'axios';

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    slot: getFormattedDateTime()
  });

  const [errors, setErrors] = useState({});

  function getFormattedDateTime() {
    const now = new Date();
    return now.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:mm
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.slot) {
      setErrors({
        name: !formData.name ? 'Name is required' : '',
        email: !formData.email ? 'Email is required' : '',
        phone: !formData.phone ? 'Phone is required' : '',
        slot: !formData.slot ? 'Slot is required' : '',
      });
      return;
    }

    const handleReservation = async (formData) => {
      try {

        console.log("form data --> ", formData);
        const response = await axios.post('https://slot-booking-backend-roan.vercel.app/api/reserve', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 201) {
          alert('Reservation sucessfully created');
          console.log('Reservation created:', response.data);
        } else {
          alert('Reservation failed');
          console.error('Reservation creation failed:', response.statusText);
        }
      } catch (error) {
        alert('unable to process request, try again');
        console.error('Error:', error);
      }
    };

    try {
      await handleReservation(formData);
      setTimeout(() => {
        alert('Payment successful!'); // Replace with your modal or message
        // You can perform other actions here after the payment confirmation
      }, 2000);
    }
    catch (error) {
      alert(error.message);
      console.error('Reservation creation failed:', error.message);
    }
  }
  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className={styles.inputField}
        placeholder="Name"
      />
      {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className={styles.inputField}
        placeholder="Email"
      />
      {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}

      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className={styles.inputField}
        placeholder="Phone"
      />
      {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
      <input
        type="datetime-local"
        name="slot"
        value={formData.slot}
        onChange={handleChange}
        min={getFormattedDateTime()}
      />
      <button type="submit">Reserve Slot</button>
    </form>
  );
};

export default ReservationForm;
