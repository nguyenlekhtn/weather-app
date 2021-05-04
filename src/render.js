import { getWeatherInfo, convertTemp } from "./weather";
// import getWallpaperSrc from "./wallpaper";

const units = {
  feel_like: "°",
  humidity: "%",
  pressure: "mb",
  temp_min: "°",
  temp_max: "°",
};

const content = document.querySelector("#content");

const changeInfo = function (data) {
  const infoLines = [...document.querySelectorAll("[data-info]")];
  for (let line of infoLines) {
    console.log(line);
    if (line.dataset.info === "location") {
      line.textContent = `${data.cityName}, ${data.country}`;
    } else {
      const value = data[line.dataset.info];
      const unit = units[line.dataset.info] ?? "";
      line.textContent = value + unit;
    }
  }
};

const toggleVisability = function (weatherCode) {
  const mainScreen = document.querySelector(".mainScreen");
  const infoContainer = document.querySelector(".infoContainer");

  if (mainScreen.className === "mainScreen mainScreen--invisable") {
    mainScreen.className = "mainScreen mainScreen--visable";
    content.style.backgroundColor = "#ddd";
  } else {
    mainScreen.className = "mainScreen mainScreen--invisable";
    content.style.backgroundColor = `#${weatherCode}`;
  }
};

let weatherInfo = {};

const changeForm = async (e) => {
  const form = e.currentTarget;
  const errorBox = document.querySelector(".errorNoti");
  try {
    e.preventDefault();
    const location = form.elements["location"].value;
    weatherInfo = await getWeatherInfo(location);
    changeInfo(weatherInfo);
    toggleVisability(weatherInfo.id);
    form.reset();
    errorBox.style.display = "none";
  } catch (err) {
    if (err === "Not found") {
      errorBox.style.display = "block";
    } else {
      console.log(err);
    }
  }
};

const handleError = function (fn) {
  return function (...params) {
    return fn(...params).catch(function (err) {
      console.log(err);
    });
  };
};

const changeUnitBtn = document.querySelector(
  ".infoContainer--button.changeUnitBtn"
);

const changeUnit = function () {
  const weatherInfoInImperial = convertTemp(weatherInfo);

  if (changeUnitBtn.textContent === "°C") {
    changeUnitBtn.textContent = "°F";
    changeInfo(weatherInfoInImperial);
  } else {
    changeUnitBtn.textContent = "°C";
    changeInfo(weatherInfo);
  }
};

const init = function () {
  const changeFormHandle = handleError(changeForm);
  const form = document.querySelector(".form");
  form.addEventListener("submit", changeFormHandle);

  const backBtn = document.querySelector(".backBtn");
  backBtn.addEventListener("click", toggleVisability);

  changeUnitBtn.addEventListener("click", changeUnit);
};

export { init };
