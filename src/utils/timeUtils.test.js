// src/utils/timeUtils.test.js

import { initializeTimes, updateTimes } from './timeUtils';

describe('timeUtils', () => {
  describe('initializeTimes', () => {
    test('should return the initial available times', () => {
      const expectedTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
      expect(initializeTimes()).toEqual(expectedTimes);
    });
  });

  describe('updateTimes', () => {
    test('should return the same state when action type is not UPDATE_TIMES', () => {
      const currentState = ['17:00', '18:00', '19:00'];
      const action = { type: 'UNKNOWN_ACTION', date: '2025-12-25' };
      expect(updateTimes(currentState, action)).toBe(currentState);
    });

    test('should return extended times on weekends', () => {
      const currentState = initializeTimes();
      const action = { type: 'UPDATE_TIMES', date: '2025-12-20' }; // Saturday
      const expectedTimes = ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
      expect(updateTimes(currentState, action)).toEqual(expectedTimes);
    });

    test('should return reduced times on weekdays', () => {
      const currentState = initializeTimes();
      const action = { type: 'UPDATE_TIMES', date: '2025-12-22' }; // Tuesday
      const expectedTimes = ['17:00', '18:00', '19:00', '20:00', '21:00'];
      expect(updateTimes(currentState, action)).toEqual(expectedTimes);
    });

    test('should handle invalid dates gracefully', () => {
      const currentState = initializeTimes();
      const action = { type: 'UPDATE_TIMES', date: 'invalid-date' };
      expect(updateTimes(currentState, action)).toEqual(currentState);
    });
  });
});
