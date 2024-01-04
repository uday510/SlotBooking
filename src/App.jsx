import React from 'react';
import Header from './components/Header.jsx';
import ReservationForm from './components/ReservationForm.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import PaymentContainer from './components/PaymentContainer';

export default function App() {
  const [showPayment, setShowPayment] = useState(false);
  const handleReservationSuccess = () => {
    setShowPayment(true);
  };

  return (
    <>
      {!showPayment ? (
        <ReservationForm handleReservationSuccess={handleReservationSuccess} />
      ) : (
        <PaymentContainer />
      )}
      <ToastContainer />
    </>
  );
}
