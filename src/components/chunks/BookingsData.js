// src/components/chunks/BookingsData.js
import React from 'react';

function BookingsData({ bookings }) {
  return (
    <section aria-labelledby="current-reservations">
      <h2 id="current-reservations">Current Reservations</h2>
      {bookings.length === 0 ? (
        <p>No reservations yet.</p>
      ) : (
        <ul>
          {bookings.map((booking, index) => (
            <li key={index}>
              <p>
                <strong>Date:</strong> {booking.date}
              </p>
              <p>
                <strong>Time:</strong> {booking.time}
              </p>
              <p>
                <strong>Guests:</strong> {booking.guests}
              </p>
              <p>
                <strong>Occasion:</strong> {booking.occasion}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default BookingsData;
