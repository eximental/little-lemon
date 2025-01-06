// src/utils/timeUtils.js

export const initializeTimes = () => {
    return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
  };
  
  export const updateTimes = (state, action) => {
    if (action.type === 'UPDATE_TIMES') {
      const selectedDate = action.date;
      const dateObj = new Date(selectedDate);
      const day = dateObj.getDay();
  
      if (isNaN(day)) { // Invalid date
        return state;
      }
  
      // Weekends have more time slots
      if (day === 0 || day === 6) { // Sunday or Saturday
        return ['17:00', '18:00', '19:00', '20:00', '21:00'];
      } else { // Weekdays
        return ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
      }
    }
    return state;
  };
  