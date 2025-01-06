// src/pages/Booking.js
import React, { useState, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import BookingForm from '../components/chunks/BookingForm';
import BookingsData from '../components/chunks/BookingsData';
import { initializeTimes, updateTimes } from '../utils/timeUtils';
import { fetchAPI, submitAPI } from '../api/api'; // Import API functions

function Booking() {
  const [bookings, setBookings] = useState([]);
  const [availableTimes, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'SET_TIMES':
          return action.times;
        default:
          return state;
      }
    },
    [], // initial state
    () => [] // initializer
  );

  const navigate = useNavigate(); // Initialize useNavigate

  // Initialize available times on component mount
  useEffect(() => {
    const fetchInitialTimes = async () => {
      try {
        const times = await initializeTimes();
        dispatch({ type: 'SET_TIMES', times });
      } catch (error) {
        console.error('Error initializing times:', error);
      }
    };
    fetchInitialTimes();
  }, []);

  // Update available times when the selected date changes
  const handleUpdateTimes = async (date) => {
    try {
      const times = await updateTimes(date);
      dispatch({ type: 'SET_TIMES', times });
    } catch (error) {
      console.error('Error fetching available times:', error);
    }
  };

  /**
   * submitForm function to handle form submission.
   * @param {Object} formData - The booking form data.
   */
  const submitForm = async (formData) => {
    try {
      const success = await submitAPI(formData);
      if (success) {
        setBookings((prevBookings) => [...prevBookings, formData]);
        // Refetch available times after booking to update the available times
        await handleUpdateTimes(formData.date);
        // Navigate to the confirmation page with booking data
        navigate('/confirmed', { state: { booking: formData } });
      } else {
        alert('Failed to submit booking. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert(error.message || 'An error occurred while submitting your booking.');
    }
  };

  return (
    <div style={{ display: 'flex', gap: '50px' }}>
      <BookingForm
        submitForm={submitForm} // Pass submitForm as a prop
        availableTimes={availableTimes}
        updateTimes={handleUpdateTimes}
      />
      <BookingsData bookings={bookings} />
    </div>
  );
}

export default Booking;
