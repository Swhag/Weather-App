const APIkey = process.env.API_KEY;

// ---------------------------------------------

function buildWeatherRequest(cityName, units) {
  return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&APPID=${APIkey}`;
}

function buildForecastRequest(cityName, units) {
  return `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${units}&appid=${APIkey}`;
}

async function getWeatherData(url) {
  const response = await fetch(url);
  const weatherData = await response.json();

  return weatherData;
}

async function getForecastData(url) {
  const response = await fetch(url);
  const ForecastData = await response.json();

  return ForecastData;
}

// ---------------------------------------------

export {
  buildWeatherRequest,
  buildForecastRequest,
  getWeatherData,
  getForecastData,
};
