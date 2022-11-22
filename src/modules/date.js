import { format, addDays, parseISO, fromUnixTime } from 'date-fns';

function formatDate(unix, dateFormat = 'full') {
  const date = fromUnixTime(unix).toUTCString();
  let dayOfWeek = date.slice(0, 3);
  let dayOfMonth = date.slice(5, 7);
  const month = date.slice(8, 11);
  const year = date.slice(12, 16);
  let suffix;

  // change 01 to 1 etc
  if (dayOfMonth < 10) {
    dayOfMonth = dayOfMonth.slice(1);
  }

  // generate correct date suffix
  if (dayOfMonth.slice(-1) === '1') {
    suffix = 'st';
  } else if (dayOfMonth.slice(-1) === '2') {
    suffix = 'nd';
  } else if (dayOfMonth.slice(-1) === '3') {
    suffix = 'rd';
  } else {
    suffix = 'th';
  }

  if (dayOfMonth > 3 && dayOfMonth < 21) {
    suffix = 'th';
  }

  // convert short day name to full day name
  if (dayOfWeek === 'Mon') {
    dayOfWeek = 'Monday';
  } else if (dayOfWeek === 'Tue') {
    dayOfWeek = 'Tuesday';
  } else if (dayOfWeek === 'Wed') {
    dayOfWeek = 'Wednesday';
  } else if (dayOfWeek === 'Thu') {
    dayOfWeek = 'Thursday';
  } else if (dayOfWeek === 'Fri') {
    dayOfWeek = 'Friday';
  } else if (dayOfWeek === 'Sat') {
    dayOfWeek = 'Saturday';
  } else if (dayOfWeek === 'Sun') {
    dayOfWeek = 'Sunday';
  }

  // return only the day of week
  if (dateFormat === 'day') {
    return dayOfWeek;
  }

  // return full date string
  return `${dayOfWeek}, ${month} ${dayOfMonth}${suffix} ${year}`;
}

export { formatDate };
