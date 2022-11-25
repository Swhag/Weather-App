import '../styles/style.css';
import * as dom from './dom';

function renderPage() {
  dom.getWeatherData();
  dom.getForecastData();
  dom.toggleUnit();
  dom.searchLocation();
}

setInterval(() => {
  dom.showDateTime();
}, 1000);

setInterval(() => {
  dom.getWeatherData();
}, 1800000);

renderPage();
