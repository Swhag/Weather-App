import { format, addDays, parseISO, fromUnixTime } from 'date-fns';

let cityName;
let units;

cityName = 'New York';
units = 'imperial';

let lat;
let lon;

lat = 40.7143;
lon = -74.006;

// ---------------------------------------------

function buildWeatherRequest(cityName) {
  return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&APPID=46db5029dab2cdfb42a90e1bce896b95`;
}

function buildForecastRequest(cityName, units) {
  return `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${units}&appid=46db5029dab2cdfb42a90e1bce896b95`;
}

// getForecastData(buildForecastRequest(cityName, units));

async function getWeatherData(url) {
  const response = await fetch(url);
  const weatherData = await response.json();

  console.log(weatherData);
  console.log(weatherData.weather[0].description);
  console.log(weatherData.name);
  console.log(`Temp: ${weatherData.main.temp}`);
  console.log(`Feels like ${weatherData.main.feels_like}`);

  return weatherData;
}

async function getForecastData(url) {
  const response = await fetch(url);
  const ForecastData = await response.json();

  console.log(ForecastData);

  return ForecastData;
}

getWeatherData(buildWeatherRequest(cityName, units));

// console.log(fromUnixTime(1669085666));
console.log(formatDate(1669085666));

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

// ---------------------------------------------

// Builds request url to obtain weather forecast
