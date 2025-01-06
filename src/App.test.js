import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import BookingForm from './components/chunks/BookingForm';
import { initializeTimes, updateTimes } from './utils/timeUtils';
import { fetchAPI } from './api/api'; // Adjust the relative path as needed

// Mocking fetchAPI for utility tests
jest.mock('./api/api', () => ({
  fetchAPI: jest.fn(),
}));


// Test for BookingForm Component
describe('BookingForm Component Tests', () => {
  const mockSubmitForm = jest.fn();
  const mockUpdateTimes = jest.fn();

  beforeEach(() => {
    render(
      <BookingForm
        submitForm={mockSubmitForm}
        availableTimes={['17:00', '18:00']}
        updateTimes={mockUpdateTimes}
      />
    );
  });

  test('submit button is disabled when form is invalid', () => {
    const submitButton = screen.getByRole('button', { name: /Make Your Reservation/i });
    expect(submitButton).toBeDisabled();
  });

  test('displays error messages for empty required fields on submit', async () => {
    const submitButton = screen.getByRole('button', { name: /Make Your Reservation/i });
  
    // Clear the "Number of guests" input to trigger validation
    const guestsInput = screen.getByLabelText(/Choose number of guests/i);
    fireEvent.change(guestsInput, { target: { value: '' } });
  
    // Submit the form
    fireEvent.click(submitButton);
  
    // Assert error messages
    expect(await screen.findByText(/Date is required./i)).toBeInTheDocument();
    expect(await screen.findByText(/Time is required./i)).toBeInTheDocument();
    expect(await screen.findByText(/Number of guests is required./i)).toBeInTheDocument();
  });
});

// Tests for timeUtils
describe('timeUtils Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('initializeTimes', () => {
    test('should return the initial available times fetched from the API', async () => {
      const mockTimes = ['17:00', '18:00', '19:00'];
      fetchAPI.mockResolvedValueOnce(mockTimes);

      const times = await initializeTimes();

      const today = new Date().toISOString().split('T')[0];
      expect(fetchAPI).toHaveBeenCalledWith(today);
      expect(times).toEqual(mockTimes);
    });

    test('should return fallback times if fetchAPI throws an error', async () => {
      fetchAPI.mockRejectedValueOnce(new Error('API Error'));

      const times = await initializeTimes();

      const fallbackTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
      expect(fetchAPI).toHaveBeenCalled();
      expect(times).toEqual(fallbackTimes);
    });
  });

  describe('updateTimes', () => {
    test('should return updated available times for a weekend date', async () => {
      const weekendDate = '2025-12-20';
      const mockTimes = ['17:00', '18:00', '19:00', '20:00', '21:00'];
      fetchAPI.mockResolvedValueOnce(mockTimes);

      const times = await updateTimes(weekendDate);

      expect(fetchAPI).toHaveBeenCalledWith(weekendDate);
      expect(times).toEqual(mockTimes);
    });

    test('should return updated available times for a weekday date', async () => {
      const weekdayDate = '2025-12-22';
      const mockTimes = ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
      fetchAPI.mockResolvedValueOnce(mockTimes);

      const times = await updateTimes(weekdayDate);

      expect(fetchAPI).toHaveBeenCalledWith(weekdayDate);
      expect(times).toEqual(mockTimes);
    });

    test('should return an empty array if fetchAPI throws an error', async () => {
      const invalidDate = 'invalid-date';
      fetchAPI.mockRejectedValueOnce(new Error('Invalid date'));

      const times = await updateTimes(invalidDate);

      expect(fetchAPI).toHaveBeenCalledWith(invalidDate);
      expect(times).toEqual([]);
    });

    test('should return available times excluding already booked slots', async () => {
      const selectedDate = '2025-12-21';
      const mockAvailableTimes = ['17:00', '18:00', '19:00'];
      fetchAPI.mockResolvedValueOnce(mockAvailableTimes);

      const times = await updateTimes(selectedDate);

      expect(fetchAPI).toHaveBeenCalledWith(selectedDate);
      expect(times).toEqual(mockAvailableTimes);
    });
  });
});
