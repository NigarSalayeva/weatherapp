let weather = {
    "apiKey": "26d0f6d33cfba0a185cc0763a234d753",
fetchWeather : function(city){
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        +"&units=metric&appid="
        + this.apiKey
    )
    .then((response)=> response.json())
    .then((data)=> this.displayWeather(data));
},
displayWeather: function(data){
const {name} = data;
const {icon, description} = data.weather[0];
const {speed} = data.wind;
const {temp, humidity} = data.main;

console.log(name, icon, description, temp, speed, humidity);
document.querySelector(".city").innerText= name;
document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".wind").innerText =
    "Wind speed: " + speed + " km/h";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    
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

weather.fetchWeather("Istanbul");