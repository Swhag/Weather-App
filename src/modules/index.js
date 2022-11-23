import '../styles/style.css';
import * as API from './API';
import * as date from './date';

let cityName;
let units;

cityName = 'Las Vegas';
units = 'imperial';

const weatherDescription = document.querySelector('.weather-info-description');
const cityNameDisplay = document.querySelector('.weather-info-city');
const dateDisplay = document.querySelector('.weather-info-date');
const timeDisplay = document.querySelector('.weather-info-time');
const tempDisplay = document.querySelector('.weather-info-temp');

async function getWeather() {
  const weatherRequest = API.buildWeatherRequest(cityName, units);
  const weatherData = await API.getWeatherData(weatherRequest);

  weatherDescription.textContent = weatherData.weather[0].description;
  cityNameDisplay.textContent = weatherData.name;

  dateDisplay.textContent = date.formatDate(weatherData.timezone);
  timeDisplay.textContent = date.formatTime(weatherData.timezone);
  tempDisplay.textContent = `Temp: ${Math.round(weatherData.main.temp)}`;

  console.log(weatherData);

  // console.log(`Temp: ${weatherData.main.temp}`);
  // console.log(`Feels like ${weatherData.main.feels_like}`);
  // console.log(`Humidity ${weatherData.main.humidity}`);
}

// API.getForecastData(API.buildForecastRequest(cityName, units));

getWeather();
