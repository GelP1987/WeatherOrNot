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
console.log("city value is "+ city)
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
console.log(apiUrl);
fetch(apiUrl).then(function(response){
  if (response.ok) {
    response.json().then(function(data){
      var lat = JSON.stringify(data.coord.lat);
      var lon = JSON.stringify(data.coord.lon);
      fetchForecast(city,lat,lon);
    })
  } else {alert("error response: "+ response.statusText)}
})
}

var fetchForecast = function(city,lat,lon) {
var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" +lat + "&lon=" +lon+"&appid=" + apiKey;
console.log(apiUrl)
fetch(apiUrl).then(function(response){
  if (response.ok){
    response.json().then(function(data){
      var date = new Date(JSON.stringify(data.current.dt)*1000).toLocaleDateString("en-US");
      console.log(date);
    })
  }
})
}
document.querySelector("#submit").addEventListener("click", search);