const APIkey = '46db5029dab2cdfb42a90e1bce896b95';
// let cityName;
// let units;

// cityName = 'New York';
// units = 'imperial';

let lat;
let lon;

lat = 40.7143;
lon = -74.006;

// ---------------------------------------------

function buildWeatherRequest(cityName, units) {
  return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&APPID=${APIkey}`;
}

function buildForecastRequest(cityName, units) {
  return `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${units}&appid=${APIkey}`;
}

async function getWeatherData(url) {
  const response = await fetch(url);
  const weatherData = await response.json();

  return weatherData;
}

async function getForecastData(url) {
  const response = await fetch(url);
  const ForecastData = await response.json();

  console.log(ForecastData);
  return ForecastData;
}

// ---------------------------------------------

export {
  buildWeatherRequest,
  buildForecastRequest,
  getWeatherData,
  getForecastData,
};
