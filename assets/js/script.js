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
          document.querySelector(".uv-index").classList.remove("text-warning", "text-danger", "text-primary", "text-info");
        } else if (uvIndex >2 && uvIndex <5){
          document.querySelector(".uv-index").classList.add("text-warning");
          document.querySelector(".uv-index").classList.remove("text-success", "text-danger", "text-primary", "text-info");
        } else if (uvIndex >5 && uvIndex <7){
          document.querySelector(".uv-index").classList.add("text-danger");
          document.querySelector(".uv-index").classList.remove("text-warning", "text-success", "text-primary", "text-info");
        } else if (uvIndex >7 && uvIndex <10){
          document.querySelector(".uv-index").classList.add("text-primary");
          document.querySelector(".uv-index").classList.remove("text-warning", "text-danger", "text-success", "text-info");
        } else if (uvIndex >10){
          document.querySelector(".uv-index").classList.add("text-info");
          document.querySelector(".uv-index").classList.remove("text-warning", "text-danger", "text-primary", "text-success");
        }
      })
    } else {alert ("Error Response: "+response.statusText);
  }
  weeklyForecast(apiUrl);
})
}

var weeklyForecast = function(apiUrl) {
fetch(apiUrl).then(function(response) {
  if (response.ok) {
    response.json().then(function(data) {
      var dayOneDate= new Date(JSON.stringify(data.daily[1].dt)*1000).toLocaleDateString("en-US");
      var dayOneTemp = JSON.stringify(data.daily[1].temp.day);
      var dayOneWind = JSON.stringify(data.daily[1].wind_speed);
      var dayOneHumidity= JSON.stringify(data.daily[1].humidity);
      var dayOneIcon=JSON.stringify(data.daily[1].weather[0].icon).slice(1, -1);
      document.querySelector(".day-one").innerHTML= 
      "<p>"+dayOneDate+"</p><p>Temp: "+dayOneTemp+"</p><p>Humidity: "+dayOneHumidity+"</p><p>Wind Speed: "+dayOneWind+"</p><p><img src='http://openweathermap.org/img/wn/" +dayOneIcon + ".png'></p>";
      var dayTwoDate= new Date(JSON.stringify(data.daily[2].dt)*1000).toLocaleDateString("en-US");
      var dayTwoTemp = JSON.stringify(data.daily[2].temp.day);
      var dayTwoWind = JSON.stringify(data.daily[2].wind_speed);
      var dayTwoHumidity= JSON.stringify(data.daily[2].humidity);
      var dayTwoIcon=JSON.stringify(data.daily[2].weather[0].icon).slice(1, -1);
      document.querySelector(".day-two").innerHTML= 
      "<p>"+dayTwoDate+"</p><p>Temp: "+dayTwoTemp+"</p><p>Humidity: "+dayTwoHumidity+"</p><p>Wind Speed: "+dayTwoWind+"</p><p><img src='http://openweathermap.org/img/wn/" +dayTwoIcon + ".png'></p>";
      var dayThreeDate= new Date(JSON.stringify(data.daily[3].dt)*1000).toLocaleDateString("en-US");
      var dayThreeTemp = JSON.stringify(data.daily[3].temp.day);
      var dayThreeWind = JSON.stringify(data.daily[3].wind_speed);
      var dayThreeHumidity= JSON.stringify(data.daily[3].humidity);
      var dayThreeIcon=JSON.stringify(data.daily[3].weather[0].icon).slice(1, -1);
      document.querySelector(".day-three").innerHTML= 
      "<p>"+dayThreeDate+"</p><p>Temp: "+dayThreeTemp+"</p><p>Humidity: "+dayThreeHumidity+"</p><p>Wind Speed: "+dayThreeWind+"</p><p><img src='http://openweathermap.org/img/wn/" +dayThreeIcon + ".png'></p>";
      var dayFourDate= new Date(JSON.stringify(data.daily[3].dt)*1000).toLocaleDateString("en-US");
      var dayFourTemp = JSON.stringify(data.daily[4].temp.day);
      var dayFourWind = JSON.stringify(data.daily[4].wind_speed);
      var dayFourHumidity= JSON.stringify(data.daily[4].humidity);
      var dayFourIcon=JSON.stringify(data.daily[4].weather[0].icon).slice(1, -1);
      document.querySelector(".day-four").innerHTML= 
      "<p>"+dayFourDate+"</p><p>Temp: "+dayFourTemp+"</p><p>Humidity: "+dayFourHumidity+"</p><p>Wind Speed: "+dayFourWind+"</p><p><img src='http://openweathermap.org/img/wn/" +dayFourIcon + ".png'></p>";
      var dayFiveDate= new Date(JSON.stringify(data.daily[3].dt)*1000).toLocaleDateString("en-US");
      var dayFiveTemp = JSON.stringify(data.daily[5].temp.day);
      var dayFiveWind = JSON.stringify(data.daily[5].wind_speed);
      var dayFiveHumidity= JSON.stringify(data.daily[5].humidity);
      var dayFiveIcon=JSON.stringify(data.daily[5].weather[0].icon).slice(1, -1);
      document.querySelector(".day-five").innerHTML= 
      "<p>"+dayFiveDate+"</p><p>Temp: "+dayFiveTemp+"</p><p>Humidity: "+dayFiveHumidity+"</p><p>Wind Speed: "+dayFiveWind+"</p><p><img src='http://openweathermap.org/img/wn/" +dayFiveIcon + ".png'></p>";
    })
}
});
}

document.querySelector("#submit").addEventListener("click", search);
