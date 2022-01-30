//Feature 1:
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

//Feature 2:
function citySearch(event) {
  event.preventDefault();
  let h4 = document.querySelector("h4");
  let cityName = document.querySelector("#location");

  console.log((h4.innerHTML = cityName.value));
  console.log(cityName.value);

  function showWeather(response) {
    Math.round(console.log(response.data.main.temp));
    document.querySelector("#temperature").innerHTML = Math.round(
      response.data.main.temp
    );
  }

  let apiKey = "fcff6baa99a6aaa2ecb4f015dd030bde";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
  console.log(url);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", citySearch);

//Bonus task week 5:
function currentWeather() {
  function showLocation(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=fcff6baa99a6aaa2ecb4f015dd030bde&units=metric`;
    axios.get(apiUrl).then(showTemperature);
  }
  function showTemperature(response) {
    let temp = Math.round(response.data.main.temp);
    let h1 = document.querySelector("h1");
    h1.innerHTML = `Current temperature outside is ${temp}°C`;
  }
  navigator.geolocation.getCurrentPosition(showLocation);
}

let button = document.querySelector("button");
button.addEventListener("click", currentWeather);
