let weather = {
    apiKey: "26d0f6d33cfba0a185cc0763a234d753",
fetchWeather : function(city){
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        +"&units=metric&appid="
        + this.apiKey
    )
    .then((response) => {
      if (!response.ok) {
        alert("No weather found.");
        throw new Error("No weather found.");
      }
      return response.json();
    })
    .then((data) => this.displayWeather(data));
},
displayWeather: function(data){
const {name} = data;
const {country} = data.sys;
const {icon, description, main} = data.weather[0];
const {speed} = data.wind;
const {temp, feels_like, temp_min, temp_max, pressure, humidity} = data.main;

document.querySelector(".city").innerText= name;
document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".wind").innerText =
    "Wind speed: " + speed + " km/h";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
      document.querySelector(".main").innerText = main;
      document.querySelector(".temp_min").innerText =
      "Min temp: " + temp_min + "°C";
      document.querySelector(".temp_max").innerText =
      "Max temp: " + temp_max + "°C";
      document.querySelector(".feels_like").innerText =
      "Feels like: " + feels_like + "°C";
      document.querySelector(".pressure").innerText =
      "Pressure: " + pressure + "hPa";
      document.querySelector(".country").innerText =
      country;
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Baku");
