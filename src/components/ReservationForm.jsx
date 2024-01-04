import React, { useState } from 'react';
import styles from './ReservationForm.module.css';
import axios from 'axios';
import Header from './Header';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReservationForm = ({ handleReservationSuccess }) => {
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


  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  //   setErrors({ ...errors, [e.target.name]: '' });
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = '';

    // Input validation for the "name" field
    if (name === 'name') {
      const isValidName = /^[a-zA-Z\s]*$/.test(value);
      errorMessage = !isValidName ? 'Please enter alphabetic characters and spaces only' : '';
    }

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: errorMessage });
  };


  const handleReservation = async (formData) => {
    try {
      const response = await axios.post('https://slot-booking-backend-roan.vercel.app/api/reserve', formData, {
        // const response = await axios.post('http://localhost:4000/api/reserve', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.status === 201;
    } catch (error) {
      toast.error('unable to create reservation, try again', {
        autoClose: 1000
      });
      return false;
    }
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
    }
    const success = await handleReservation(formData);

    if (success) {
      toast.success('Reservation success, please make payment', {
        autoClose: 1000,
        onClose: () => {
          handleReservationSuccess();
        },

      });
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <Header />
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className={styles.inputField}
        placeholder="Name"
        pattern="[A-Za-z ]+"
        title="Please enter alphabetic characters only"
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
        pattern="[0-9]*"
        title="Please enter numbers only"
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
