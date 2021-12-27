const output = document.querySelector('#output');
const inputCity = document.querySelector('#input-city');
const btnSearch = document.querySelector('#btn-search');
const outputCity = document.querySelector('.output-city');
const btnCurrentLocation = document.querySelector('#btn-current-location');
const dateTime = document.querySelector('.date-time');
const weatherDesc = document.querySelector('.weather-desc');
const tempValue = document.querySelector('.temp-value');
const tempMetric = document.querySelector('.temp-metric');
const cityHumidity = document.querySelector('.city-humidity');
const cityWind = document.querySelector('.city-wind');

btnSearch.addEventListener('click', getWeatherInfo);
btnCurrentLocation.addEventListener('click', getWeatherInfo);

function getWeatherInfo(e) {
  e.preventDefault();

  const apiKey = 'fefa3094b5179a5209c7fa545cbbccb1';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;

  const target = e.target;

  if (target.id.indexOf('current') != -1) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;

      apiUrl += `lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
      getWeather(apiUrl);
    });
  } else {
    if (inputCity.value) {
      const city = inputCity.value;
      apiUrl += `q=${city}&units=metric&appid=${apiKey}`;
      getWeather(apiUrl);
    }
  }
}

function getWeather(url) {
  axios.get(url).then((res) => {
    output.classList.remove('d-none');
    let temp = Math.round(res.data.main.temp);
    outputCity.innerText = res.data.name;
    dateTime.innerText = getDateTime();
    weatherDesc.innerText = res.data.weather[0].main;
    tempValue.innerText = temp;
    tempMetric.innerText = '°C';
    cityHumidity.innerText = `Humidity: ${res.data.main.humidity}%`;
    cityWind.innerText = `Wind: ${res.data.wind.speed} km/h`;
  });
}

function getDateTime() {
  const date = new Date();
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  let hour = date.getHours();
  const min = date.getMinutes();

  if (hour > 12) {
    hour = hour + 12;
  }

  return `${days[date.getDay()]} ${hour}:${min}`;
}
