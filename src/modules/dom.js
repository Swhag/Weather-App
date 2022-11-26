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

function showForecastDays(forecastData) {
  const dayOne = document.querySelector('.forecast-day-one');
  const dayTwo = document.querySelector('.forecast-day-two');
  const dayThree = document.querySelector('.forecast-day-three');
  const dayFour = document.querySelector('.forecast-day-four');
  const dayFive = document.querySelector('.forecast-day-five');
  const fiveDaysArray = [dayOne, dayTwo, dayThree, dayFour, dayFive];

  // Increment of 8 means 24 hours later or the following day.
  let count = 7;
  for (let i = 0; i < fiveDaysArray.length; i++) {
    const currentDay = forecastData[count];
    fiveDaysArray[i].textContent = utils.formatDay(currentDay.dt, timezone);
    count += 8;
  }
}

function showForecastTemp(forecastData) {
  const dayOne = document.querySelector('.day-one-temp');
  const dayTwo = document.querySelector('.day-two-temp');
  const dayThree = document.querySelector('.day-three-temp');
  const dayFour = document.querySelector('.day-four-temp');
  const dayFive = document.querySelector('.day-five-temp');
  const daysArray = [dayOne, dayTwo, dayThree, dayFour, dayFive];

  // Increment of 8 means 24 hours later or the following day.
  let count = 7;
  for (let i = 0; i < daysArray.length; i++) {
    const currentDay = forecastData[count];
    daysArray[i].textContent = `${Math.round(
      currentDay.main.temp,
    )} ${tempUnits}`;
    count += 8;
  }
}

function showForecastLow(forecastData) {
  const dayOne = document.querySelector('.day-one-low');
  const dayTwo = document.querySelector('.day-two-low');
  const dayThree = document.querySelector('.day-three-low');
  const dayFour = document.querySelector('.day-four-low');
  const dayFive = document.querySelector('.day-five-low');
  const daysArray = [dayOne, dayTwo, dayThree, dayFour, dayFive];

  // Increment of 8 means 24 hours later or the following day.
  let count = 7;
  for (let i = 0; i < daysArray.length; i++) {
    const currentDay = forecastData[count];
    daysArray[i].textContent = `${Math.round(
      currentDay.main.feels_like,
    )} ${tempUnits}`;
    count += 8;
  }
}

// console.log(forecastData[39].main.feels_like);

function showForecastIcons(forecastData) {
  const dayOne = document.querySelector('.forecast-icon-one');
  const dayTwo = document.querySelector('.forecast-icon-two');
  const dayThree = document.querySelector('.forecast-icon-three');
  const dayFour = document.querySelector('.forecast-icon-four');
  const dayFive = document.querySelector('.forecast-icon-five');
  const daysArray = [dayOne, dayTwo, dayThree, dayFour, dayFive];

  // Increment of 8 means 24 hours later or the following day.
  let count = 7;
  for (let i = 0; i < daysArray.length; i++) {
    const currentDay = forecastData[count];
    daysArray[i].innerHTML = icons.getIcon(currentDay.weather[0].icon);
    count += 8;
  }
}

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

  // console.log(weatherData);
}

async function getForecastData() {
  const forecastRequest = API.buildForecastRequest(cityName, units);
  const forecastData = await API.getForecastData(forecastRequest);

  showChanceOfRain(forecastData.list[0].pop);
  showForecastDays(forecastData.list);
  showForecastTemp(forecastData.list);
  showForecastLow(forecastData.list);
  showForecastIcons(forecastData.list);

  console.log(forecastData.list[10]);
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
    getForecastData();
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
