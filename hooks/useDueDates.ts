/**
 * A custom hook that provides utilities for managing due dates.
 *
 * @param setDueDate - A function to set the due date.
 * @returns An object with the following properties:
 *   - today: The current day of the week.
 *   - tomorrow: The day of the week for tomorrow.
 *   - nextWeek: The day, month, and date for next week.
 *   - setToday: A function to set the due date to today.
 *   - setTomorrow: A function to set the due date to tomorrow.
 *   - setNextWeek: A function to set the due date to next week.
 */
import dayjs from 'dayjs';

function useDueDates(setDueDate: (date: Date) => void) {
  const today = dayjs();
  const tomorrow = today.add(1, 'day');
  const nextWeek = today.add(7, 'day');

  return {
    today: today.format('ddd'),
    tomorrow: tomorrow.format('ddd'),
    nextWeek: nextWeek.format('ddd MMM D'),
    setToday: () => setDueDate(today.toDate()),
    setTomorrow: () => setDueDate(tomorrow.toDate()),
    setNextWeek: () => setDueDate(dayjs(nextWeek).toDate()),
  };
}

export default useDueDates;
