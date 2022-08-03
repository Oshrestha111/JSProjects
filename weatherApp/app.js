const API_key = "db159aa6dcc8db51f5a8f151b8f71400";

const wrapper = document.querySelector(".wrapper"),
  inputPart = wrapper.querySelector(".input-part"),
  infoMsg = inputPart.querySelector(".info-msg"),
  inputField = inputPart.querySelector("input"),
  locationBtn = inputPart.querySelector("button"),
  weatherImg = wrapper.querySelector(".weather-part img"),
  backArrow = wrapper.querySelector("header i");

let api;

inputField.addEventListener("keyup", function (e) {
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
  }
});

locationBtn.addEventListener("click", function (e) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError); // gives current position on succes and error on error
  } else {
    infoMsg.innerHTML = "Geolocation is not supported by this browser.";
  }
});

function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_key}`;

  fetchData(api);
}

function fetchData(api) {
  infoMsg.innerText = " Getting weather details ...";
  infoMsg.classList.add("pending");
  fetch(api)
    .then((res) => res.json())
    .then((data) => weatherDetails(data));
}

function onError(error) {
  infoMsg.innerText = error.message;
  infoMsg.classList.add("error");
}

function requestApi(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_key}`;
  fetchData(api);
}

function weatherDetails(info) {
  if (info.cod == "404") {
    infoMsg.innerText = `${inputField.value}  ${info.message}`;
    infoMsg.classList.replace("pending", "error");
  } else {
    console.log(info, "info:", info.main.temp);

    infoMsg.classList.remove("pending", "error");
    wrapper.classList.add("active");
    //main.temp, feels_like, humidity/ info.sys.country, name / info.weather[0].description

    const temp = Math.round(info.main.temp);
    const { description, id } = info.weather[0];
    const location = info.name + ", " + info.sys.country;
    const feelsLike = Math.round(info.main.feels_like);
    const humidity = info.main.humidity;

    // acc to id we can determine weather type from openweatherapp

    if (id >= "200" && id <= "232") {
      weatherImg.src = "http://openweathermap.org/img/wn/11d@2x.png";
    } else if (id >= "300" && id <= "321") {
      weatherImg.src = "http://openweathermap.org/img/wn/09d@2x.png";
    } else if (id >= "500" && id <= "531") {
      weatherImg.src = "http://openweathermap.org/img/wn/10d@2x.png";
    } else if (id >= "600" && id <= "622") {
      weatherImg.src = "http://openweathermap.org/img/wn/13d@2x.png";
    } else if (id >= "700" && id <= "781") {
      weatherImg.src = "http://openweathermap.org/img/wn/50d@2x.png";
    } else if (id == "800") {
      weatherImg.src = "http://openweathermap.org/img/wn/01d@2x.png";
    } else {
      weatherImg.src = "http://openweathermap.org/img/wn/02d@2x.png";
    }

    wrapper.querySelector(".temp .num").innerText = temp;
    wrapper.querySelector(".weather").innerText = description;
    wrapper.querySelector(".location span").innerText = location;
    wrapper.querySelector(".bottom-details .temp span").innerText = feelsLike;
    wrapper.querySelector(".bottom-details .numb").innerText = humidity;
  }
}

backArrow.addEventListener("click", function () {
  wrapper.classList.remove("active");
});
