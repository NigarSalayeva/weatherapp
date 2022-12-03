
const displayWeather= (data)=> {
const {name} = data;
const {dt} = data;
const {country} = data.sys;
const {icon, description, main} = data.weather[0];
const {speed, deg} = data.wind;
const {temp, feels_like, temp_min, temp_max, pressure, humidity} = data.main;

const date = new Date(dt);

const countryName= document.querySelector('.country');
const getCountry = async (country) => {
try {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${country}`);
    const data = await res.json();
    if(data[0].altSpellings[1]){
        countryName.innerText = data[0].altSpellings[1];
    } 
    else{
        countryName.innerText = data[0].altSpellings[0];
    }
} catch (e) {
    alert('No country such as exists!', e);
}
}
document.querySelector(".city").innerText= name;
document.querySelector(".icon").src =
    "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
  document.querySelector(".temp").innerText = Math.floor(temp) + "°C";
  document.querySelector(".wind").innerText =
  "Wind speed: " + speed + " km/h";
  document.querySelector(".humidity").innerText =
    "Humidity: " + humidity + "%";
    document.querySelector(".main").innerText = main;
    document.querySelector(".temp_min").innerText =
    "Min temp: " + Math.floor(temp_min) + "°C";
    document.querySelector(".temp_max").innerText =
    "Max temp: " + Math.floor(temp_max) + "°C";
    document.querySelector(".feels_like").innerText =
    "Feels like: " + Math.floor(feels_like) + "°C";
    document.querySelector(".pressure").innerText =
    "Pressure: " + pressure + "hPa";
    document.querySelector(".country").innerText =
    getCountry(country);

    if(deg<= 90){
      document.querySelector(".wind_direction").innerText =
      "Wind direction: East " + deg +"°";
    }
    else if (deg<=180){
      document.querySelector(".wind_direction").innerText =
      "Wind direction: South "  + deg +"°";
    }
    else if( deg<=270){
      document.querySelector(".wind_direction").innerText =
      "Wind direction: West "  + deg +"°";
    }
    else{
      document.querySelector(".wind_direction").innerText =
      "Wind direction: North "  + deg +"°";
    }
    document.querySelector(".date").innerText= date.toLocaleDateString();
    document.querySelector(".time").innerText= date.toLocaleTimeString();
}


window.addEventListener('load', () => {
  let lon;
  let lat;

  if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((pos) => {
          lon = pos.coords.longitude;
          lat = pos.coords.latitude;

          const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=26d0f6d33cfba0a185cc0763a234d753`

          fetch(api,{mode: 'cors'}).then((res) => {
              return res.json();
          })
          .then((data) => {
              displayWeather(data);
          })
          .catch((err)=> {
              alert("There is no data like that", err);
          })
      })
  }
})