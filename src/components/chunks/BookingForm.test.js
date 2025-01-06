// BookingForm.test.js (continued)
describe('JavaScript Validation and Form Submission', () => {
    test('submit button is disabled when form is invalid', () => {
      const submitButton = screen.getByRole('button', { name: /Make Your Reservation/i });
      expect(submitButton).toBeDisabled();
    });
  
    test('displays error messages for empty required fields on submit', async () => {
      const submitButton = screen.getByRole('button', { name: /Make Your Reservation/i });
      
      // Attempt to submit the form without filling any fields
      fireEvent.click(submitButton);
  
      // Check for error messages
      const dateError = await screen.findByText(/Date is required./i);
      const timeError = await screen.findByText(/Time is required./i);
      const guestsError = await screen.findByText(/Number of guests is required./i);
  
      expect(dateError).toBeInTheDocument();
      expect(timeError).toBeInTheDocument();
      expect(guestsError).toBeInTheDocument();
      expect(mockSubmitForm).not.toHaveBeenCalled();
    });
  
    test('displays error when selecting a past date', async () => {
      const dateInput = screen.getByLabelText(/Choose date/i);
      const submitButton = screen.getByRole('button', { name: /Make Your Reservation/i });
  
      // Set a past date
      const pastDate = '2020-01-01';
      fireEvent.change(dateInput, { target: { value: pastDate } });
  
      // Attempt to submit the form
      fireEvent.click(submitButton);
  
      // Check for date error message
      const dateError = await screen.findByText(/Date cannot be in the past./i);
      expect(dateError).toBeInTheDocument();
      expect(mockSubmitForm).not.toHaveBeenCalled();
    });
  
    test('displays error when number of guests is less than 1', async () => {
      const guestsInput = screen.getByLabelText(/Number of guests/i);
      const submitButton = screen.getByRole('button', { name: /Make Your Reservation/i });
  
      // Enter invalid number of guests
      fireEvent.change(guestsInput, { target: { value: '0' } });
  
      // Attempt to submit the form
      fireEvent.click(submitButton);
  
      // Check for guests error message
      const guestsError = await screen.findByText(/At least one guest is required./i);
      expect(guestsError).toBeInTheDocument();
      expect(mockSubmitForm).not.toHaveBeenCalled();
    });
  
    test('displays error when number of guests is more than 10', async () => {
      const guestsInput = screen.getByLabelText(/Number of guests/i);
      const submitButton = screen.getByRole('button', { name: /Make Your Reservation/i });
  
      // Enter invalid number of guests
      fireEvent.change(guestsInput, { target: { value: '11' } });
  
      // Attempt to submit the form
      fireEvent.click(submitButton);
  
      // Check for guests error message
      const guestsError = await screen.findByText(/Maximum of 10 guests allowed./i);
      expect(guestsError).toBeInTheDocument();
      expect(mockSubmitForm).not.toHaveBeenCalled();
    });
  
    test('enables submit button when form is valid and submits correctly', async () => {
      const dateInput = screen.getByLabelText(/Choose date/i);
      const timeSelect = screen.getByLabelText(/Choose time/i);
      const guestsInput = screen.getByLabelText(/Number of guests/i);
      const occasionSelect = screen.getByLabelText(/Occasion/i);
      const submitButton = screen.getByRole('button', { name: /Make Your Reservation/i });
  
      // Set a valid future date
      const futureDate = '2025-12-31';
      fireEvent.change(dateInput, { target: { value: futureDate } });
  
      // Mock updateTimes to simulate fetching available times
      await waitFor(() => expect(mockUpdateTimes).toHaveBeenCalledWith(futureDate));
  
      // Select a time
      fireEvent.change(timeSelect, { target: { value: '18:00' } });
  
      // Enter a valid number of guests
      fireEvent.change(guestsInput, { target: { value: '4' } });
  
      // Select an occasion
      fireEvent.change(occasionSelect, { target: { value: 'Anniversary' } });
  
      // Wait for form validation
      await waitFor(() => expect(submitButton).toBeEnabled());
  
      // Submit the form
      fireEvent.click(submitButton);
  
      // Check that submitForm was called with correct data
      expect(mockSubmitForm).toHaveBeenCalledWith({
        date: futureDate,
        time: '18:00',
        guests: '4', // Note: Input values are strings
        occasion: 'Anniversary',
      });
    });
  
    test('displays no error messages when form is valid', async () => {
      const dateInput = screen.getByLabelText(/Choose date/i);
      const timeSelect = screen.getByLabelText(/Choose time/i);
      const guestsInput = screen.getByLabelText(/Number of guests/i);
      const occasionSelect = screen.getByLabelText(/Occasion/i);
      const submitButton = screen.getByRole('button', { name: /Make Your Reservation/i });
  
      // Set a valid future date
      const futureDate = '2025-12-31';
      fireEvent.change(dateInput, { target: { value: futureDate } });
  
      // Mock updateTimes to simulate fetching available times
      await waitFor(() => expect(mockUpdateTimes).toHaveBeenCalledWith(futureDate));
  
      // Select a time
      fireEvent.change(timeSelect, { target: { value: '19:00' } });
  
      // Enter a valid number of guests
      fireEvent.change(guestsInput, { target: { value: '5' } });
  
      // Select an occasion
      fireEvent.change(occasionSelect, { target: { value: 'Birthday' } });
  
      // Wait for form validation
      await waitFor(() => expect(submitButton).toBeEnabled());
  
      // Ensure no error messages are displayed
      expect(screen.queryByText(/is required./i)).not.toBeInTheDocument();
      expect(screen.queryByText(/cannot be in the past./i)).not.toBeInTheDocument();
      expect(screen.queryByText(/At least one guest is required./i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Maximum of 10 guests allowed./i)).not.toBeInTheDocument();
    });
  });
  