import '../styles/style.css';
import * as dom from './dom';

function renderPage() {
  dom.renderWeatherData();
  dom.renderForecastData();
  dom.toggleUnit();
  dom.searchLocation();
}

setInterval(() => {
  dom.showDateTime();
}, 1000);

setInterval(() => {
  dom.renderWeatherData();
}, 1800000);

renderPage();
