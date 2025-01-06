// Booking.js
import React, { useState, useReducer } from 'react';
import BookingForm from '../components/chunks/BookingForm';
import BookingsData from '../components/chunks/BookingsData';
import { initializeTimes, updateTimes } from '../utils/timeUtils'; // Import the functions

function Booking() {
    const [bookings, setBookings] = useState([]);
    const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

    const addBooking = (booking) => {
        setBookings((prevBookings) => [...prevBookings, booking]);
    };

    return (
        <div style={{ display: 'flex', gap: '50px' }}>
            <BookingForm 
                addBooking={addBooking} 
                availableTimes={availableTimes} 
                dispatch={dispatch} 
            />
            <BookingsData bookings={bookings} />
        </div>
    );
}

export default Booking;
