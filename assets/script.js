function search(city) {
  event.preventDefault();
  var city= document.querySelector("#search-user").value.trim();
  if (city){
    fetchWeather(city);
    document.querySelector("#search-user").value="";
    } else {
      alert("Error, please enter a city name into the field!");
    }
}
var apiKey= "cb6468ec33c134e7752e6d6c7833865b"
var fetchWeather = function(city) {
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
fetch(apiUrl).then(function(response){
  if (response.ok) {
    response.json().then(function(data){
      var lat = JSON.stringify(data.coord.lat);
      var lon = JSON.stringify(data.coord.lon);
      fetchTodaysForecast(city,lat,lon);
    })
  } else {alert("error response: "+ response.statusText)}
})
}

var fetchTodaysForecast = function(city,lat,lon) {
var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" +lat + "&lon=" +lon+"&appid=" + apiKey;
fetch(apiUrl).then(function(response){
  if (response.ok){
    response.json().then(function(data){
      var date = new Date(JSON.stringify(data.current.dt)*1000).toLocaleDateString("en-US");
      var icon= JSON.stringify(data.current.weather[0].icon).slice(1, -1);
      document.querySelector(".city-date").innerHTML= city + " " + date + "<img src='http://openweathermap.org/img/wn/" +icon + ".png'>";
      var temp= JSON.stringify(data.current.temp);
      document.querySelector(".temp").innerHTML = "Temp: "+ temp;
      var wind=JSON.stringify(data.current.wind_speed);
      document.querySelector(".wind").innerHTML = "Wind Speed: "+ wind;
      var humidity=JSON.stringify(data.current.humidity);
      document.querySelector(".humidity").innerHTML = "Humidity: "+humidity;
      var uvIndex=JSON.stringify(data.current.uvi);
      document.querySelector(".uv-index").innerHTML = "UV Index: "+uvIndex;
      if (uvIndex <2) {
        document.querySelector(".uv-index").classList.add("text-success");
      } else if (uvIndex >2 && uvIndex <5){
        document.querySelector(".uv-index").classList.add("text-warning");
      } else if (uvIndex >5 && uvIndex <7){
        document.querySelector(".uv-index").classList.add("text-danger");
      } else if (uvIndex >7 && uvIndex <10){
        document.querySelector(".uv-index").classList.add("text-primary");
      } else if (uvIndex >10){
        document.querySelector(".uv-index").classList.add("text-info");
      }
    })
  }
})
}
document.querySelector("#submit").addEventListener("click", search);