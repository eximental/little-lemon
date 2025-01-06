// BookingForm.js
import React, { useState } from 'react';

function BookingForm({ addBooking, availableTimes, dispatch }) {
    const [formData, setFormData] = useState({
        date: '',
        time: '17:00',
        guests: 1,
        occasion: 'Birthday',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));

        if (id === 'date') {
            dispatch({ type: 'UPDATE_TIMES', date: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addBooking(formData);
        setFormData({
            date: '',
            time: '17:00',
            guests: 1,
            occasion: 'Birthday',
        });
    };

    return (
        <form
            style={{ display: 'grid', maxWidth: '300px', gap: '15px' }} 
            onSubmit={handleSubmit}
        >
            <h2>Make a Reservation</h2>

            <label htmlFor="date">Choose date</label>
            <input
                type="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                required
            />

            <label htmlFor="time">Choose time</label>
            <select
                id="time"
                value={formData.time}
                onChange={handleChange}
            >
                {availableTimes.map((time, index) => (
                    <option key={index} value={time}>{time}</option>
                ))}
            </select>

            <label htmlFor="guests">Number of guests</label>
            <input
                type="number"
                id="guests"
                value={formData.guests}
                onChange={handleChange}
                min="1"
                max="10"
                required
            />

            <label htmlFor="occasion">Occasion</label>
            <select
                id="occasion"
                value={formData.occasion}
                onChange={handleChange}
            >
                <option>Birthday</option>
                <option>Anniversary</option>
            </select>

            <input type="submit" value="Make Your Reservation" />
        </form>
    );
}

export default BookingForm;
