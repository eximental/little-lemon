// src/utils/timeUtils.js

import { fetchAPI } from '../api/api';

/**
 * Initializes available times by fetching from the API for today's date.
 * @returns {Promise<Array<string>>} - A promise that resolves to an array of available times.
 */
export const initializeTimes = async () => {
  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  try {
    const times = await fetchAPI(today);
    return times;
  } catch (error) {
    console.error('Error fetching initial times:', error);
    return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00']; // Fallback times
  }
};

/**
 * Updates available times based on the selected date.
 * @param {string} date - The selected date in YYYY-MM-DD format.
 * @returns {Promise<Array<string>>} - A promise that resolves to an array of available times.
 */
export const updateTimes = async (date) => {
  try {
    const times = await fetchAPI(date);
    return times;
  } catch (error) {
    console.error('Error updating times:', error);
    return []; // Return empty array on error
  }
};
