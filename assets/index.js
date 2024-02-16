const weather_form = document.querySelector("#submit-form");
const celsius_container = document.querySelector("#celsius-text");
const weather_description = document.querySelector("#weather-description");
const city = document.querySelector("#input");
const humidity_container = document.querySelector("#humidity-value");
const wind_container = document.querySelector("#wind-value");
const weather_img = document.querySelector("#weather-img");

function capitalizeFirstLetter(words) {
  const words_array = words.split(" ");

  for (let index = 0; index < words_array.length; index++) {
    words_array[index] =
      words_array[index].at(0).toUpperCase() + words_array[index].slice(1);
  }

  return words_array.join(" ");
}

weather_form.addEventListener("submit", (e) => {
  e.preventDefault();

  const weather = fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${
      city.value
    }&appid=${"a21e69c40de06430f93b4cd92c08f03a"}`
  );

  weather
    .then((data) => {
      if (!data.ok) {
        throw new Error("City not Found");
      }
      return data.json();
    })
    .then((data) => {
      const celsius = data.main.temp;
      const description = data.weather[0].description;
      const humidity = data.main.humidity;
      const wind = data.wind.speed;
      console.log(data);
      weather_img.src = "assets/image/clearsky.png";

      celsius_container.innerHTML = `${Math.floor(celsius - 273.15)}&deg;C`;
      weather_description.innerHTML = `${capitalizeFirstLetter(description)}`;
      humidity_container.innerHTML = `${humidity}%`;
      wind_container.innerHTML = `${Math.floor((wind * 3600) / 1000)} km/h`;
    })
    .catch((error) => {
      celsius_container.innerHTML = `${error.message}`;
      weather_description.innerHTML = "";
      weather_img.src = "assets/image/not-found.png";
    });
});
