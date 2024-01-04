import React from 'react';
import Header from './components/Header.jsx';
import ReservationForm from './components/ReservationForm.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <Header />
      <ReservationForm />
      <ToastContainer />
    </>
  );
}
