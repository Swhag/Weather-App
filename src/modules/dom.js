import * as API from './API';
import * as date from './date';
import * as icons from './icons';

let cityName = 'New York';
let units = 'imperial';
let tempUnits = '°F';
let timezone = -18000;

async function renderWeatherData() {
  const weatherRequest = API.buildWeatherRequest(cityName, units);
  const weatherData = await API.getWeatherData(weatherRequest);

  showWeatherDescription(weatherData.weather[0].description);
  showName(weatherData.name);
  showTemp(weatherData.main.temp);
  showIcon(weatherData.weather[0].icon);
  timezone = weatherData.timezone;
  showDateTime();

  // console.log(`Temp: ${weatherData.main.temp}`);
  // console.log(`Feels like ${weatherData.main.feels_like}`);
  // console.log(`Humidity ${weatherData.main.humidity}`);

  console.log(weatherData);
}

function showWeatherDescription(weatherDescription) {
  const descriptionDisplay = document.querySelector('.weather-description');
  descriptionDisplay.textContent =
    weatherDescription[0].toUpperCase() + weatherDescription.substring(1);
}

function showName(cityName) {
  const cityNameDisplay = document.querySelector('.weather-city');
  cityNameDisplay.textContent = cityName;
}

function showDateTime() {
  const dateDisplay = document.querySelector('.weather-date');
  const timeDisplay = document.querySelector('.weather-time');
  dateDisplay.textContent = date.formatDate(timezone);
  timeDisplay.textContent = date.formatTime(timezone);
  // console.log('time refreshed');
}

function showTemp(temperature) {
  const tempDisplay = document.querySelector('.weather-temp');
  tempDisplay.textContent = `${Math.round(temperature)} ${tempUnits}`;
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
    renderWeatherData();
  });
}

function showIcon(icon) {
  const weatherIcon = document.querySelector('.weather-icon');
  weatherIcon.innerHTML = icons.getIcon(icon);
}

function searchLocation() {
  const searchBar = document.querySelector('.search-box-input');
  document.addEventListener('submit', (e) => {
    e.preventDefault();
    cityName = searchBar.value;
    searchBar.value = '';
    renderWeatherData();
  });
}

export { renderWeatherData, searchLocation, toggleUnit, showDateTime };
