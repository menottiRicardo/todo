import dayjs from "dayjs";

export function getTimeOfDay() {
  const currentHour = new Date().getHours();

  if (currentHour >= 6 && currentHour < 12) {
    return 'morning';
  } else if (currentHour >= 12 && currentHour < 18) {
    return 'afternoon';
  } else if (currentHour >= 18 && currentHour < 21) {
    return 'evening';
  } else {
    return 'night';
  }
}

export function formatDate(date: Date, format: string) {
  return dayjs(date).format(format);
}
