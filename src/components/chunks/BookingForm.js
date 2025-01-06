// src/components/chunks/BookingForm.js
import React, { useState, useEffect } from 'react';

function BookingForm({ submitForm, availableTimes, updateTimes }) {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 1,
    occasion: 'Birthday',
  });

  // State for managing loading status
  const [isLoading, setIsLoading] = useState(false);

  // State for tracking form validity
  const [isFormValid, setIsFormValid] = useState(false);

  // State for managing validation errors
  const [formErrors, setFormErrors] = useState({
    date: '',
    time: '',
    guests: '',
  });

  // Fetch available times when the component mounts if date is already set
  useEffect(() => {
    if (formData.date) {
      fetchAvailableTimes(formData.date);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to run once on mount

  // Function to handle fetching available times with loading state
  const fetchAvailableTimes = async (date) => {
    setIsLoading(true);
    try {
      await updateTimes(date);
    } catch (error) {
      alert('Failed to fetch available times. Please try again later.');
      console.error('Error fetching available times:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Validate individual fields
  const validateField = (id, value) => {
    let error = '';

    switch (id) {
      case 'date':
        if (!value) {
          error = 'Date is required.';
        } else if (new Date(value) < new Date().setHours(0, 0, 0, 0)) {
          error = 'Date cannot be in the past.';
        }
        break;
      case 'time':
        if (!value) {
          error = 'Time is required.';
        }
        break;
        case 'guests':
            if (!value) {
                error = 'Number of guests is required.';
            } else if (value < 1) {
                error = 'At least one guest is required.';
            } else if (value > 10) {
                error = 'Maximum of 10 guests allowed.';
            }
            break;
      default:
        break;
    }

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [id]: error,
    }));
  };

  // Validate the entire form
  const validateForm = () => {
    const { date, time, guests } = formData;
    let valid = true;

    // Validate date
    if (!date) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        date: 'Date is required.',
      }));
      valid = false;
    } else if (new Date(date) < new Date().setHours(0, 0, 0, 0)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        date: 'Date cannot be in the past.',
      }));
      valid = false;
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        date: '',
      }));
    }

    // Validate time
    if (!time) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        time: 'Time is required.',
      }));
      valid = false;
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        time: '',
      }));
    }

// Validate guests
if (!formData.guests || formData.guests === "") {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      guests: "Number of guests is required.",
    }));
    valid = false;
  } else if (formData.guests < 1) {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      guests: "At least one guest is required.",
    }));
    valid = false;
  } else if (formData.guests > 10) {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      guests: "Maximum of 10 guests allowed.",
    }));
    valid = false;
  } else {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      guests: "",
    }));
  }
  

    setIsFormValid(valid);
  };

  // useEffect to validate the form whenever formData changes
  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const handleChange = async (e) => {
    const { id, value } = e.target;

    // Update formData state
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    // Validate the specific field
    validateField(id, value);

    if (id === 'date') {
      await fetchAvailableTimes(value);
      // Reset time selection when date changes
      setFormData((prevData) => ({
        ...prevData,
        time: '',
      }));
      // Also reset time error
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        time: 'Time is required.',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Final validation before submission
    validateForm();

    if (!isFormValid) {
      alert('Please fix the errors in the form before submitting.');
      return;
    }

    submitForm(formData); // Call submitForm with formData
    setFormData({
      date: '',
      time: '',
      guests: 1,
      occasion: 'Birthday',
    });
    // Reset form errors
    setFormErrors({
      date: '',
      time: '',
      guests: '',
    });
    setIsFormValid(false);
  };

  // Get today's date in YYYY-MM-DD format for setting min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <form
      style={{ display: 'grid', maxWidth: '300px', gap: '15px' }}
      onSubmit={handleSubmit}
      noValidate // Disable default HTML5 validation UI
      aria-label="Booking Form"
    >
      <h2>Make a Reservation</h2>

      {/* Date Field */}
      <fieldset>
        <legend>Reservation Date</legend>
        <label htmlFor="date">Choose date</label>
        <input
          type="date"
          id="date"
          value={formData.date}
          onChange={handleChange}
          required
          min={today} // Prevent selecting past dates
          aria-label="Choose date"
        />
        {formErrors.date && (
          <p role="alert" style={{ color: 'red', fontSize: '0.8em' }}>
            {formErrors.date}
          </p>
        )}
      </fieldset>

      {/* Time Field */}
      <fieldset>
        <legend>Reservation Time</legend>
        <label htmlFor="time">Choose time</label>
        <select
          id="time"
          value={formData.time}
          onChange={handleChange}
          required
          disabled={isLoading || !formData.date} // Disable while loading or if date not selected
          aria-label="Reservation Time"
        >
          {isLoading ? (
            <option>Loading...</option> // Show loading indicator
          ) : (
            <>
              <option value="" disabled>
                Select a time
              </option>
              {availableTimes.length > 0 ? (
                availableTimes.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))
              ) : (
                <option>No available times</option>
              )}
            </>
          )}
        </select>
        {formErrors.time && (
          <p role="alert" style={{ color: 'red', fontSize: '0.8em' }}>
            {formErrors.time}
          </p>
        )}
      </fieldset>

      {/* Guests Field */}
      <fieldset>
  <legend>Number of Guests</legend>
  <label htmlFor="guests">Number of guests</label>
  <input
    type="number"
    id="guests"
    value={formData.guests}
    onChange={handleChange}
    min="1"
    max="10"
    required
    aria-label="Choose number of guests"
  />
  {formErrors.guests && (
    <p role="alert" style={{ color: "red", fontSize: "0.8em" }}>
      {formErrors.guests}
    </p>
  )}
</fieldset>


      {/* Occasion Field */}
      <fieldset>
        <legend>Occasion</legend>
        <label htmlFor="occasion">Occasion</label>
        <select id="occasion" value={formData.occasion} onChange={handleChange} aria-label="Choose occasion">
          <option>Birthday</option>
          <option>Anniversary</option>
        </select>
      </fieldset>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={!isFormValid} // Disable if form is invalid
          style={{
            backgroundColor: isFormValid ? '#4CAF50' : '#9E9E9E',
            color: 'white',
            padding: '10px',
            border: 'none',
            cursor: isFormValid ? 'pointer' : 'not-allowed',
          }}
          aria-label="Make Your Reservation"
        >
          Make Your Reservation
        </button>
      </div>
    </form>
  );
}

export default BookingForm;
