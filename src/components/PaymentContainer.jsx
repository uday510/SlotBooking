import React, { useState } from 'react';

const PaymentContainer = () => {
  const [showLoader, setShowLoader] = useState(true);

  // Simulating payment processing
  setTimeout(() => {
    setShowLoader(false); // Hide loader after 2 seconds
  }, 2000);

  return (
    <div>
      {showLoader ? (
        <div>Loading...</div> // Your loader component or message
      ) : (
        <div>Payment completed!</div> // Your payment completion UI
      )}
    </div>
  );
};

export default PaymentContainer;
