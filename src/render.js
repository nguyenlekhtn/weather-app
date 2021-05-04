import { getWeatherInfo } from "./weather";
// import getWallpaperSrc from "./wallpaper";

const units = {
  temp: "°",
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
      console.log(data.cityName, data.country);
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

  if (mainScreen.style.display === "none") {
    mainScreen.style.display = "flex";
    infoContainer.className = "infoContainer";
    content.style.backgroundColor = "#ddd";
  } else {
    mainScreen.style.display = "none";
    infoContainer.className = "infoContainer infoContainer--visable";
    content.style.backgroundColor = `#${weatherCode}`;
  }
};

// const changeBgImg = async function (description) {
//   try {
//     const content = document.querySelector("#content");
//     const src = await getWallpaperSrc(description);
//     console.log(src);
//     // content.setAttribute(
//     //   "style",
//     //   `background-image: url(${src}), background-repeat: no-repeat, background-size: cover`
//     // );
//   } catch (err) {
//     console.error(err);
//   }
// };

const changeForm = async (e) => {
  const form = e.currentTarget;
  const errorBox = document.querySelector(".error");
  try {
    e.preventDefault();
    const location = form.elements["location"].value;
    const info = await getWeatherInfo(location);
    changeInfo(info);
    toggleVisability(info.id);
    // changeBgImg(info.description);
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

const init = function () {
  const changeFormHandle = handleError(changeForm);
  const form = document.querySelector(".form");
  form.addEventListener("submit", changeFormHandle);

  const backBtn = document.querySelector(".infoContainer__back.button");
  backBtn.addEventListener("click", toggleVisability);
};

export { init };
