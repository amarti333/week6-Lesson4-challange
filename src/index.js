//Feature 1:
function formating() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let year = now.getFullYear();
  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let month = months[now.getMonth()];

  let h3 = document.querySelector("h3");
  h3.innerHTML = `${day} ${month} ${date}, ${hours}:${minutes}, ${year}`;
}

formating();

function displayTemp(response) {
  let temperatrureElement = document.querySelector("#temperature");
  temperatrureElement.innerHTML = Math.round(celsiusTemp);

  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let windSpeedElement = document.querySelector("#wind");
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);

  let humidityElement = document.querySelector("#humid");
  humidityElement.innerHTML = response.data.main.humidity;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  celsiusTemp = response.data.main.temp;
}

function search(city) {
  let apiKey = "fcff6baa99a6aaa2ecb4f015dd030bde";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayTemp);
  console.log(url);
}

function mainSearch(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheiteTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  let temperatrureElement = document.querySelector("#temperature");
  temperatrureElement.innerHTML = fahrenheiteTemp;
}
celsiusTemp = null;

let form = document.querySelector("#city-form");
form.addEventListener("submit", mainSearch);
search("Salt Lake City");

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

//Bonus task week 5:
function currentWeather() {
  function showLocation(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    let latitudeElement = position.coords.latitude;
    let longitudeElement = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitudeElement}&lon=${longitudeElement}&appid=fcff6baa99a6aaa2ecb4f015dd030bde&units=metric`;
    axios.get(apiUrl).then(showTemperature);
  }

  function showTemperature(response) {
    console.log(response.data.main.temp);
    let temp = Math.round(response.data.main.temp);
    let h1 = document.querySelector("h1");
    h1.innerHTML = `Current temperature outside is ${temp}°C`;
  }

  navigator.geolocation.getCurrentPosition(showLocation);
}

let button = document.querySelector("button");
button.addEventListener("click", currentWeather);
