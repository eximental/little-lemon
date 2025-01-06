// BookingForm.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import BookingForm from './BookingForm';

// Mock functions for required props
const mockAddBooking = jest.fn();
const mockDispatch = jest.fn();

describe('BookingForm Component', () => {
  test('renders the BookingForm heading', () => {
    render(
      <BookingForm
        addBooking={mockAddBooking}
        availableTimes={['17:00', '18:00', '19:00']}
        dispatch={mockDispatch}
      />
    );
    
    // Check for the heading "Make a Reservation"
    const headingElement = screen.getByText(/Make a Reservation/i);
    expect(headingElement).toBeInTheDocument();
  });

  // Additional tests can go here
});
