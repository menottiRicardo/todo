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
