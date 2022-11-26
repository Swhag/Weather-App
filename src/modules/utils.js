import { fromUnixTime } from 'date-fns';

// title case conversion
function capitalize(words) {
  const spacedWord = words.toLowerCase().split(' ');
  for (let i = 0; i < spacedWord.length; i++) {
    spacedWord[i] =
      spacedWord[i].charAt(0).toUpperCase() + spacedWord[i].substring(1);
  }
  return spacedWord.join(' ');
}

function formatDate(offset, dateFormat = 'full') {
  const unix = Number(Date.now().toString().slice(0, 10));
  const date = fromUnixTime(unix + offset).toUTCString();
  let dayOfWeek = date.slice(0, 3);
  let dayOfMonth = date.slice(5, 7);
  const month = date.slice(8, 11);
  const year = date.slice(12, 16);
  let suffix;

  // change 01 to 1 etc
  if (dayOfMonth < 10) {
    dayOfMonth = dayOfMonth.slice(1);
  }

  // generate date suffix
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

function formatTime(offset, timeFormat = 'full') {
  const unix = Number(Date.now().toString().slice(0, 10));
  const date = fromUnixTime(unix + offset).toUTCString();
  let hour = date.slice(17, 19);
  const minute = date.slice(20, 22);
  let amOrPm;

  if (hour > 11) {
    amOrPm = 'pm';
  } else {
    amOrPm = 'am';
  }

  // change 24hr to 12hr time
  if (hour > 12) {
    hour -= 12;
  }

  // change am times to 12hr time
  if (hour < 10 && amOrPm === 'am') {
    hour = hour.slice(1, 2);
  }

  // midnight formatting
  if (hour === '0') {
    hour = 12;
  }

  // return just the hour
  if (timeFormat === 'hour') {
    return `${hour} ${amOrPm}`;
  }
  return `${hour}:${minute} ${amOrPm}`;
}

function formatDay(unix, offset, dateFormat = 'full') {
  const date = fromUnixTime(unix + offset).toUTCString();
  let dayOfWeek = date.slice(0, 3);
  let dayOfMonth = date.slice(5, 7);
  let month = date.slice(8, 11);

  // change 01 to 1 etc
  if (dayOfMonth < 10) {
    dayOfMonth = dayOfMonth.slice(1);
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

  // convert month name to number
  if (month === 'Jan') {
    month = '1month';
  } else if (month === 'Feb') {
    month = '2';
  } else if (month === 'Mar') {
    month = '3';
  } else if (month === 'Apr') {
    month = '4';
  } else if (month === 'May') {
    month = '5';
  } else if (month === 'Jun') {
    month = '6';
  } else if (month === 'Jul') {
    month = '7';
  } else if (month === 'Aug') {
    month = '8';
  } else if (month === 'Sep') {
    month = '9';
  } else if (month === 'Oct') {
    month = '10';
  } else if (month === 'Nov') {
    month = '11';
  } else if (month === 'Dec') {
    month = '12';
  }

  // return full date string
  return `${dayOfWeek} - ${month}/${dayOfMonth}`;
}

export { capitalize, formatDate, formatTime, formatDay };
