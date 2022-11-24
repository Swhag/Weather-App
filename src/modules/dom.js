import * as API from './API';
import * as date from './date';
import * as icons from './icons';

let cityName = 'New York';
let units = 'imperial';
let tempUnits = '°F';
let speedUnits = 'mi/h';
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

  showFeelsLikeTemp(weatherData.main.feels_like);
  showHumidity(weatherData.main.humidity);
  showWindSpeed(weatherData.wind.speed);

  // console.log(weatherData);
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
      speedUnits = 'km/h';
    } else {
      units = 'imperial';
      tempUnits = '°F';
      speedUnits = 'mi/h';
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

// -----------------------------------------------------------------

function showFeelsLikeTemp(feelsTemp) {
  const feelsLikeDisplay = document.querySelector('.feels-like');

  feelsLikeDisplay.textContent = `Feels like: ${Math.round(
    feelsTemp,
  )} ${tempUnits}`;
}

function showHumidity(humidity) {
  const humidityDisplay = document.querySelector('.humidity');
  humidityDisplay.textContent = `Humidity: ${humidity} %`;
}

function showWindSpeed(windSpeed) {
  const windSpeedDisplay = document.querySelector('.wind-speed');
  windSpeedDisplay.textContent = `Wind Speed: ${windSpeed} ${speedUnits}`;
}

function showChanceOfRain(pop) {
  const popDisplay = document.querySelector('.pop');
  popDisplay.textContent = `Humidity: ${po} %`;
}

// -----------------------------------------------------------------

async function renderForecastData() {
  const forecastRequest = API.buildForecastRequest(cityName, units);
  const forecastData = await API.getForecastData(forecastRequest);
}

renderForecastData();

export { renderWeatherData, searchLocation, toggleUnit, showDateTime };
