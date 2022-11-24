import * as API from './API';
import * as date from './date';
import * as icons from './icons';

let cityName = 'New York';
let units = 'imperial';
let tempUnits = '°F';

async function getWeatherData() {
  const weatherDescription = document.querySelector('.weather-description');
  const cityNameDisplay = document.querySelector('.weather-city');
  const dateDisplay = document.querySelector('.weather-date');
  const timeDisplay = document.querySelector('.weather-time');
  const tempDisplay = document.querySelector('.weather-temp');
  const weatherIcon = document.querySelector('.weather-icon');
  const weatherRequest = API.buildWeatherRequest(cityName, units);
  const weatherData = await API.getWeatherData(weatherRequest);

  weatherDescription.textContent =
    weatherData.weather[0].description[0].toUpperCase() +
    weatherData.weather[0].description.substring(1);
  cityNameDisplay.textContent = weatherData.name;
  dateDisplay.textContent = date.formatDate(weatherData.timezone);
  timeDisplay.textContent = date.formatTime(weatherData.timezone);
  tempDisplay.textContent = `${Math.round(weatherData.main.temp)} ${tempUnits}`;
  weatherIcon.innerHTML = icons.getIcon(weatherData.weather[0].icon);

  // console.log(`Temp: ${weatherData.main.temp}`);
  // console.log(`Feels like ${weatherData.main.feels_like}`);
  // console.log(`Humidity ${weatherData.main.humidity}`);
}

function searchLocation() {
  const searchBar = document.querySelector('.search-box-input');

  document.addEventListener('submit', (e) => {
    e.preventDefault();
    cityName = searchBar.value;
    searchBar.value = '';
    getWeatherData();
  });
}

function toggleUnit() {
  const unitToggle = document.querySelector('.toggle-input');

  unitToggle.addEventListener('change', () => {
    if (units === 'imperial') {
      units = 'metric';
      tempUnits = '°C';
    } else {
      units = 'imperial';
      tempUnits = '°F';
    }
    getWeatherData();
  });
}
console.log(getWeatherData());

function getWeatherIcon() {
  const weatherIcon = document.querySelector('.weather-icon');
  // weatherIcon.innerHTML = icons.cloud;
}

export { getWeatherData, searchLocation, toggleUnit, getWeatherIcon };
