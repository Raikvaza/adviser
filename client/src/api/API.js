export const baseURL = 'http://localhost:8080/api';

export function getCurrentDate() { // Gives the current date
    const date = new Date();
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
}

export function formatDateCalendar(dateStr) { // Formats the given date into year-month-day format
  const date = new Date(dateStr);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));