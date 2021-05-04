/* eslint-disable no-useless-catch */
const OW_API_KEY = "d18b0303a18d918427d55f12799bf6ab";

const getServerData = async function getOpenWeatherData(
  cityName,
  isMetric = true
) {
  try {
    const units = isMetric ? "metric" : "imperial";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${OW_API_KEY}&units=${units}`,
      { mode: "cors" }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getWeatherInfo = async function (location) {
  const data = await getServerData(location);
  console.log(data);
  if (data.cod == 404) {
    throw "Not found";
  }
  const id = data.weather[0].id;
  const main = data.weather[0].main;
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;
  const temp = data.main.temp;
  const feel_like = data.main.feels_like;
  const temp_min = data.main.temp_min;
  const temp_max = data.main.temp_max;
  const pressure = data.main.pressure;
  const humidity = data.main.humidity;
  const cityName = data.name;
  const country = data.sys.country;
  return {
    units: "metric",
    id,
    main,
    description,
    icon,
    temp,
    feel_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    cityName,
    country,
  };
};

const CtoF = function (tempinC) {
  const tempinF = (9 / 5) * tempinC + 32;
  return Math.round(tempinF * 10) / 10;
};

const FtoC = function (tempinF) {
  const tempinC = ((tempinF - 32) * 5) / 9;
  return Math.round(tempinC * 10) / 10;
};

const convertTemp = function (data) {
  const newData = { ...data };
  let converFunction;
  if (data.units === "metric") {
    converFunction = CtoF;
    newData.units = "imperial";
  } else {
    converFunction = FtoC;
    newData.units = "metric";
  }

  newData.temp = converFunction(data.temp);
  newData.feel_like = converFunction(data.feel_like);
  newData.temp_max = converFunction(data.temp_max);
  newData.temp_min = converFunction(data.temp_min);

  return newData;
};

export { getWeatherInfo, convertTemp };
