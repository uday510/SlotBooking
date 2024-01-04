import React from 'react';
import Header from './components/Header.jsx';
import ReservationForm from './components/ReservationForm.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
export default function App() {
  const [showPayment, setShowPayment] = useState(false);
  // return (
  //   <>
  //     <Header />
  //     <ReservationForm />
  //     <ToastContainer />
  //   </>
  // );
  const handleReservationSuccess = () => {
    setShowPayment(true);
  };
  
  return (
    <>
      <Header />
      {!showPayment ? ( // Show ReservationForm if showPayment is false
        <ReservationForm handleReservationSuccess={handleReservationSuccess} />
      ) : (
        <PaymentContainer /> // Show PaymentContainer if showPayment is true
      )}
      <ToastContainer />
    </>
  );
}
