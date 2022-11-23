import '../styles/style.css';
import * as API from './API';
import * as date from './date';

let cityName = 'New York';
let units = 'imperial';

function render() {
  const searchBar = document.querySelector('.search-box-input');
  document.addEventListener('submit', (e) => {
    e.preventDefault();
    cityName = searchBar.value;
    console.log(cityName);
  });
}

const weatherDescription = document.querySelector('.weather-description');
const cityNameDisplay = document.querySelector('.weather-city');
const dateDisplay = document.querySelector('.weather-date');
const timeDisplay = document.querySelector('.weather-time');
const tempDisplay = document.querySelector('.weather-temp');

async function getWeather() {
  const weatherRequest = API.buildWeatherRequest(cityName, units);
  const weatherData = await API.getWeatherData(weatherRequest);

  weatherDescription.textContent = weatherData.weather[0].description;
  cityNameDisplay.textContent = weatherData.name;

  dateDisplay.textContent = date.formatDate(weatherData.timezone);
  timeDisplay.textContent = date.formatTime(weatherData.timezone);
  tempDisplay.textContent = `${Math.round(weatherData.main.temp)} °F`;

  console.log(weatherData);

  // console.log(`Temp: ${weatherData.main.temp}`);
  // console.log(`Feels like ${weatherData.main.feels_like}`);
  // console.log(`Humidity ${weatherData.main.humidity}`);
}

// API.getForecastData(API.buildForecastRequest(cityName, units));

getWeather();
render();
