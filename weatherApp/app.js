const API_key = "db159aa6dcc8db51f5a8f151b8f71400";

const wrapper = document.querySelector(".wrapper"),
  inputPart = wrapper.querySelector(".input-part"),
  infoMsg = inputPart.querySelector(".info-msg"),
  inputField = inputPart.querySelector("input");

inputField.addEventListener("keyup", function (e) {
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
  }
});

function requestApi(city) {
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`;
  fetch(api).then((res) => console.log(res.json()));

  //   api not working
}
