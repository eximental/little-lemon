import React from 'react';

function BookingsData({ bookings }) {
    return (
        <div style={{ maxWidth: '400px' }}>
            <h2>Current Reservations</h2>
            {bookings.length === 0 ? (
                <p>No reservations yet.</p>
            ) : (
                <ul>
                    {bookings.map((booking, index) => (
                        <li key={index}>
                            <strong>Date:</strong> {booking.date} <br />
                            <strong>Time:</strong> {booking.time} <br />
                            <strong>Guests:</strong> {booking.guests} <br />
                            <strong>Occasion:</strong> {booking.occasion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default BookingsData;
