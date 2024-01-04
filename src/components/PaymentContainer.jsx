import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from './PaymentContainer.module.css';

const PaymentContainer = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const handlePayment = () => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      setPaymentCompleted(true);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      {!paymentCompleted && (
        <div className={styles.paymentSection}>
          <p className={styles.paymentText}>Pay ₹0</p>
          <button className={styles.paymentButton} onClick={handlePayment}>Make Payment</button>
        </div>
      )}
      {showLoader && !paymentCompleted && (
        <div className={styles.loader}>
          <FontAwesomeIcon icon={faSpinner} spin />
          <span className={styles.loaderText}>Processing...</span>
        </div>
      )}
      {paymentCompleted && (
        <div className={styles.paymentSuccess}>
          <p className={styles.successText}>Payment Completed</p>
        </div>
      )}
    </div>
  );
};

export default PaymentContainer;

