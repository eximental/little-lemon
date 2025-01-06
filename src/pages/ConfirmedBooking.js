// src/pages/ConfirmedBooking.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ConfirmedBooking() {
  const location = useLocation();
  const navigate = useNavigate();

  // Access the booking data passed via navigate
  const { booking } = location.state || {};

  // If no booking data is available, redirect to the booking page
  if (!booking) {
    navigate('/booking');
    return null; // Render nothing while redirecting
  }

  return (
    <main>
      <section aria-labelledby="confirmation-heading" style={{ textAlign: 'center', padding: '50px' }}>
        <h1 id="confirmation-heading">Booking Confirmed!</h1>
        <p>Thank you for your reservation. We look forward to serving you.</p>
        <div style={{ marginTop: '30px', textAlign: 'left', display: 'inline-block' }}>
          <h2>Your Reservation Details:</h2>
          <p>
            <strong>Date:</strong> {booking.date}
          </p>
          <p>
            <strong>Time:</strong> {booking.time}
          </p>
          <p>
            <strong>Number of Guests:</strong> {booking.guests}
          </p>
          <p>
            <strong>Occasion:</strong> {booking.occasion}
          </p>
        </div>
      </section>
    </main>
  );
}

export default ConfirmedBooking;
