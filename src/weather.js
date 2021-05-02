const getData = async function getWeatherData(cityName) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d18b0303a18d918427d55f12799bf6ab`, { mode: "cors" });
  const weatherData = await response.json();
  return weatherData;
};

const test = async function () {
  console.log(await getData("london"));
};

export default test;
