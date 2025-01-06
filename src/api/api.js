// src/api/api.js

// In-memory store for bookings
const bookings = {};

/**
 * Fetch available times for a given date.
 * Excludes times that have already been booked.
 * @param {string} date - The date in YYYY-MM-DD format.
 * @returns {Promise<Array<string>>} - A promise that resolves to an array of available times.
 */
export const fetchAPI = (date) => {
  return new Promise((resolve, reject) => {
    // Simulate an API call with a delay
    setTimeout(() => {
      if (!date) {
        reject(new Error('Date is required'));
        return;
      }

      const day = new Date(date).getDay();
      if (isNaN(day)) {
        reject(new Error('Invalid date'));
        return;
      }

      // Define all possible time slots
      let allTimes;
      if (day === 0 || day === 6) { // Sunday or Saturday
        allTimes = ['17:00', '18:00', '19:00', '20:00', '21:00'];
      } else { // Weekdays
        allTimes = ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
      }

      // Get already booked times for the date
      const bookedTimes = bookings[date] || [];

      // Filter out booked times
      const availableTimes = allTimes.filter(time => !bookedTimes.includes(time));

      resolve(availableTimes);
    }, 500); // 0.5-second delay for simulation
  });
};

/**
 * Submit a new booking.
 * Checks for double bookings and adds the booking if the time slot is available.
 * @param {Object} formData - The booking form data.
 * @param {string} formData.date - The reservation date in YYYY-MM-DD format.
 * @param {string} formData.time - The reservation time (e.g., '17:00').
 * @param {number} formData.guests - Number of guests.
 * @param {string} formData.occasion - Occasion for the reservation.
 * @returns {Promise<boolean>} - Resolves to true if booking is successful, otherwise rejects with an error.
 */
export const submitAPI = (formData) => {
  return new Promise((resolve, reject) => {
    // Simulate an API call with a delay
    setTimeout(() => {
      const { date, time, guests, occasion } = formData;

      // Basic validation
      if (!date || !time || !guests || !occasion) {
        reject(new Error('Missing required fields'));
        return;
      }

      // Initialize bookings for the date if not present
      if (!bookings[date]) {
        bookings[date] = [];
      }

      // Check if the time slot is already booked
      if (bookings[date].includes(time)) {
        reject(new Error('This time slot is already booked.'));
        return;
      }

      // Add the booking
      bookings[date].push(time);

      resolve(true);
    }, 500); // 0.5-second delay for simulation
  });
};
