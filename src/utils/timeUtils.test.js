// src/utils/timeUtils.test.js

import { initializeTimes, updateTimes } from './timeUtils';
import { fetchAPI } from '../api/api';

// Mock the fetchAPI function
jest.mock('../api/api', () => ({
  fetchAPI: jest.fn(),
}));

describe('timeUtils', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  describe('initializeTimes', () => {
    test('should return the initial available times fetched from the API', async () => {
      // Arrange
      const mockTimes = ['17:00', '18:00', '19:00'];
      fetchAPI.mockResolvedValueOnce(mockTimes);

      // Act
      const times = await initializeTimes();

      // Assert
      const today = new Date().toISOString().split('T')[0];
      expect(fetchAPI).toHaveBeenCalledWith(today);
      expect(times).toEqual(mockTimes);
    });

    test('should return fallback times if fetchAPI throws an error', async () => {
      // Arrange
      fetchAPI.mockRejectedValueOnce(new Error('API Error'));

      // Act
      const times = await initializeTimes();

      // Assert
      const fallbackTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
      expect(fetchAPI).toHaveBeenCalled();
      expect(times).toEqual(fallbackTimes);
    });
  });

  describe('updateTimes', () => {
    test('should return the updated available times fetched from the API for a weekend date', async () => {
      // Arrange
      const weekendDate = '2025-12-20'; // Saturday
      const mockTimes = ['17:00', '18:00', '19:00', '20:00', '21:00'];
      fetchAPI.mockResolvedValueOnce(mockTimes);

      // Act
      const times = await updateTimes(weekendDate);

      // Assert
      expect(fetchAPI).toHaveBeenCalledWith(weekendDate);
      expect(times).toEqual(mockTimes);
    });

    test('should return the updated available times fetched from the API for a weekday date', async () => {
      // Arrange
      const weekdayDate = '2025-12-22'; // Tuesday
      const mockTimes = ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
      fetchAPI.mockResolvedValueOnce(mockTimes);

      // Act
      const times = await updateTimes(weekdayDate);

      // Assert
      expect(fetchAPI).toHaveBeenCalledWith(weekdayDate);
      expect(times).toEqual(mockTimes);
    });

    test('should return an empty array if fetchAPI throws an error', async () => {
      // Arrange
      const invalidDate = 'invalid-date';
      fetchAPI.mockRejectedValueOnce(new Error('Invalid date'));

      // Act
      const times = await updateTimes(invalidDate);

      // Assert
      expect(fetchAPI).toHaveBeenCalledWith(invalidDate);
      expect(times).toEqual([]);
    });

    test('should return available times excluding already booked slots', async () => {
      // Assuming that fetchAPI returns only available times
      // If you have additional logic to exclude booked times, mock accordingly
      const selectedDate = '2025-12-21'; // Sunday
      const mockAvailableTimes = ['17:00', '18:00', '19:00'];
      fetchAPI.mockResolvedValueOnce(mockAvailableTimes);

      // Act
      const times = await updateTimes(selectedDate);

      // Assert
      expect(fetchAPI).toHaveBeenCalledWith(selectedDate);
      expect(times).toEqual(mockAvailableTimes);
    });
  });
});
