import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to submit the payment details
  };

  let alertsuccesfull=async()=>{
    alert("Succesfull");
    navigate('/home');

  }

  return (
    <div className="container">
      <h2>Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="cardNumber" className="form-label">Card Number:</label>
          <input
            type="text"
            className="form-control"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="cardholderName" className="form-label">Cardholder Name:</label>
          <input
            type="text"
            className="form-control"
            id="cardholderName"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
          />
        </div>

        <div className="row mb-3">
          <div className="col">
            <label htmlFor="expiryDate" className="form-label">Expiry Date:</label>
            <input
              type="text"
              className="form-control"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>

          <div className="col">
            <label htmlFor="cvv" className="form-label">CVV:</label>
            <input
              type="text"
              className="form-control"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" onClick={()=>alertsuccesfull()}>Submit Payment</button>
      </form>
    </div>
  );
}