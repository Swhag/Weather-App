import '../styles/style.css';
import * as API from './API';
import * as date from './date';

// API.getWeatherData(API.buildWeatherRequest());
// API.getForecastData(API.buildForecastRequest());

async function getWeather() {
  const weatherRequest = API.buildWeatherRequest();
  const weatherData = await API.getWeatherData(weatherRequest);

  const weatherDescription = weatherData.weather[0].description;

  console.log(weatherData);
  // console.log(weatherData.weather[0].description);
  // console.log(weatherData.name);
  // console.log(date.formatDate(weatherData.dt));

  // console.log(`Temp: ${weatherData.main.temp}`);
  // console.log(`Feels like ${weatherData.main.feels_like}`);
  // console.log(`Humidity ${weatherData.main.humidity}`);

  return weatherData;
}

function test() {
  const weatherData = getWeather();
  console.log(weatherData);

  console.log(weatherData.weather[0].description);
}

test();
