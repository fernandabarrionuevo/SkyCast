import { apiConection } from "./api.js";

const addBtn = document.querySelector("#add-btn");
const searchBtn = document.querySelector("#search-btn");

const inputCityName = document.querySelector(".nav__bar__search__form__input");
const cardsContainer = document.querySelector("[data-cards]");

async function handleCityName(event) {
  event.preventDefault();

  const cityName = inputCityName.value.trim();
  const data = await apiConection.getInfo(cityName);
  const dataPollution = await apiConection.getAirQuality(data.coord.lat, data.coord.lon);

  const name = data.name;
  const weatherDescription = firtsLetterUpperCase(data.weather[0].description);
  const temperature = Math.round(data.main.temp);
  const minTemperature = Math.round(data.main.temp_min);
  const maxTemperature = Math.round(data.main.temp_max);
  const feelsLike = Math.round(data.main.feels_like);
  const windSpeed = Math.round(data.wind.speed);
  let airQuality = dataPollution.list[0].main.aqi;
  const visibility = (data.visibility)*0.001;

  switch (airQuality) {
    case 1:
      airQuality = "Bueno";
      break;
    case 2:
      airQuality = "Aceptable";
      break;
      case 3:
      airQuality = "Moderado";
      break;
      case 4:
      airQuality = "Pobre";
      break;
    default:
      airQuality = "Muy pobre";
      break;
  }

  createCard(
    name,
    weatherDescription,
    temperature,
    minTemperature,
    maxTemperature,
    feelsLike,
    windSpeed,
    airQuality,
    visibility
  );
}

addBtn.addEventListener("click", (event) => {
  handleCityName(event);
  inputCityName.value = '';
});

function createCard(
  cityName,
  description,
  temp,
  min,
  max,
  feelsLike,
  wind,
  windQuality,
  visibility
) {
  const card = `<div class="card">
    <div class="card__img"></div>
    <div class="car__basic__info">
      <h4 class="card__city__name">${cityName}</h4>
      <p class="card__city__description">${description}</p>
      <p class="card__city__temperature">${temp}ºC</p>
      <p class="card__city__minmax">min ${min}ºC | max ${max}ºC</p>
    </div>

    <table class="card__detailed__info">
      <tr class="card__detailed__info__column">
        <td>Sensación Térmica</td>
        <td
          class="card__detailed__info__column__item"
          id="sensacion-termica"
        >
        ${feelsLike}ºC
        </td>
      </tr>
      <tr class="card__detailed__info__column">
        <td>Viento</td>
        <td class="card__detailed__info__column__item" id="viento">
        ${wind} km/h
        </td>
      </tr>
      <tr class="card__detailed__info__column">
        <td>Calidad del Aire</td>
        <td class="card__detailed__info__column__item" id="calidad-aire">
        ${windQuality}
        </td>
      </tr>
      <tr class="card__detailed__info__column">
        <td>Visibilidad</td>
        <td class="card__detailed__info__column__item" id="visivilidad">
        ${visibility} km
        </td>
      </tr>
    </table>
    </div>`;

  cardsContainer.innerHTML += card;
}

function selectiIcon(iconCode) {
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@4x.png`;
  this.style.backgroundImage = `url(${iconUrl})`;
}

function firtsLetterUpperCase(phrase){
  let words = phrase.split(' ');
  return words.map( w => w[0].toUpperCase() + w.slice(1)).join(' ');
}
