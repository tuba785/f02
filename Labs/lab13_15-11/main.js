const form = document.querySelector(".form");
const input = document.querySelector(".input");
const info = document.querySelector(".info");
const infoCity = document.querySelector(".infoCity");
const infoDegree = document.querySelector(".infoDegree");
const infoWeather = document.querySelector(".infoWeather");
const infoIcon = document.querySelector(".infoIcon");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = input.value.trim();
  if (city) {
    getWeather(city);
  }
  form.reset();
});

const getWeather = async (city) => {
  const apiKey = "77ad401252a5a770f1cd82b9025e93a7";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`;
  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.cod === "404") {
        alert("City not found!");
        return;
      }

      infoCity.textContent = `${data.name}, ${data.sys.country}`;
      infoDegree.textContent = `${data.main.temp}°C`;
      infoWeather.textContent = `${
        data.weather[0].description.charAt(0).toUpperCase() +
        data.weather[0].description.slice(1)
      }`;
      infoIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      info.style.display = "block";
    })
    .catch((err) => console.log(err));
};
