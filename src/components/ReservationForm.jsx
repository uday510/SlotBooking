import React, { useState } from 'react';
import styles from './ReservationForm.module.css';
import axios from 'axios';
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
        const response = await axios.post('https://slot-booking-backend-roan.vercel.app/api/reserve', formData, {
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

    const succes = await handleReservation(formData);

    // if (succes) {
    //   toast.success('Reservation created, payment is in progess...', { autoClose: 2000 });

    //   setTimeout(() => {
    //     <div>
    //       <p>Please make a payment</p>
    //       <button>Make Payment</button>
    //     </div>
    //   }, 2000);
    //   try {
    //     setTimeout(() => {
    //       toast.success('Payment successful!', {
    //         autoClose: 2000,
    //       });
    //     }, 2000);
    //   } catch (error) {
    //     toast.error('Payment failed');
    //   }
    // }

    if (succes) {
      handleReservationSuccess();
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
