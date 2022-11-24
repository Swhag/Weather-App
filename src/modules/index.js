import '../styles/style.css';
import * as API from './API';
import * as date from './date';
import * as dom from './dom';

function render() {
  dom.getWeatherData();
  dom.toggleUnit();
  dom.searchLocation();
}

// API.getForecastData(API.buildForecastRequest(cityName, units));

render();
