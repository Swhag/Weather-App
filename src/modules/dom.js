import * as API from './API';
import * as utils from './utils';
import * as icons from './icons';

let cityName = 'New York';
let units = 'imperial';
let tempUnits = '°F';
let speedUnits = 'mph';
let timezone = -18000;
let windSpeed;

function showWeatherDescription(weatherDescription) {
  const descriptionDisplay = document.querySelector('.weather-description');
  descriptionDisplay.textContent = utils.capitalize(weatherDescription);
}

function showName() {
  const cityNameDisplay = document.querySelector('.weather-city');
  cityNameDisplay.textContent = utils.capitalize(cityName);
}

function showDateTime() {
  const dateDisplay = document.querySelector('.weather-date');
  const timeDisplay = document.querySelector('.weather-time');

  dateDisplay.textContent = utils.formatDate(timezone);
  timeDisplay.textContent = utils.formatTime(timezone);
}

function showTemp(temperature) {
  const tempDisplay = document.querySelector('.weather-temp');
  tempDisplay.textContent = `${Math.round(temperature)} ${tempUnits}`;
}

function showIcon(icon) {
  const weatherIcon = document.querySelector('.weather-icon');
  weatherIcon.innerHTML = icons.getIcon(icon);
}

// -----------------------------------------------------------------

function showFeelsLikeTemp(feelsTemp) {
  const feelsLikeDisplay = document.querySelector('.feels-like');
  const feelsLikeIconDIsplay = document.querySelector('.feels-like-icon');

  feelsLikeDisplay.textContent = `${Math.round(feelsTemp)} ${tempUnits}`;
  feelsLikeIconDIsplay.innerHTML = icons.feelsLikeIcon;
}

function showHumidity(humidity) {
  const humidityDisplay = document.querySelector('.humidity');
  const humidityIconDisplay = document.querySelector('.humidity-icon');

  humidityDisplay.textContent = `${humidity} %`;
  humidityIconDisplay.innerHTML = icons.humidityIcon;
}

function showWindSpeed(speed) {
  const windSpeedDisplay = document.querySelector('.wind-speed');
  const windSpeedIconDisplay = document.querySelector('.wind-icon');

  windSpeedDisplay.textContent = `${speed} ${speedUnits}`;
  windSpeedIconDisplay.innerHTML = icons.windIcon;
}

function showChanceOfRain(pop) {
  const popDisplay = document.querySelector('.pop');
  const showPopDisplay = document.querySelector('.pop-icon');

  popDisplay.textContent = `${pop * 100} %`;
  showPopDisplay.innerHTML = icons.popIcon;
}

// -----------------------------------------------------------------

// Function is needed because weather API is returning incorrect km/h wind speed
function convertUnits(speed) {
  if (units === 'imperial') {
    windSpeed = speed;
  }
  if (units === 'metric') {
    windSpeed *= 1.60934;
  }
  return Math.round(windSpeed);
}

// // Function is needed because weather API is returning incorrect km/h wind speed
async function getWindData() {
  const weatherRequest = API.buildWeatherRequest(cityName, 'imperial');
  const weatherData = await API.getWeatherData(weatherRequest);

  showWindSpeed(convertUnits(weatherData.wind.speed));
}

// -----------------------------------------------------------------

async function getWeatherData() {
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
  getWindData();

  console.log(weatherData);
}

async function getForecastData() {
  const forecastRequest = API.buildForecastRequest(cityName, units);
  const forecastData = await API.getForecastData(forecastRequest);

  showChanceOfRain(forecastData.list[0].pop);

  console.log(forecastData);
  console.log(forecastData.list[7]);
  console.log(forecastData.list[15]);
  console.log(forecastData.list[23]);
  console.log(forecastData.list[31]);
  console.log(forecastData.list[39]);
}

// -----------------------------------------------------------------

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
      speedUnits = 'mph';
    }
    getWeatherData();
  });
}

function searchLocation() {
  const searchBar = document.querySelector('.search-box-input');
  document.addEventListener('submit', (e) => {
    e.preventDefault();
    cityName = searchBar.value;
    searchBar.value = '';
    getWeatherData();
    getForecastData();
  });
}

export {
  getWindData,
  getWeatherData,
  getForecastData,
  searchLocation,
  toggleUnit,
  showDateTime,
};
