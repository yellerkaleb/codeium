// script.js
mapboxgl.accessToken = 'pk.eyJ1Ijoia2V2aW5ob3UtZXhhZnVuY3Rpb24iLCJhIjoiY2xvaHh4azBtMDJhdTJqbnhsbzhzcGR0MiJ9.hUwrT3MGeUxhGW-TNfmWjw';
const openWeatherApiKey = 'fb0443eb12f22190c484901e43643523';
let map;
let marker;
var isPlaying = false;
var mTemp = [];
var sliderInterval;

var slider = document.getElementById("slider");
var temperatureElement = document.getElementById("temperature");
var playPauseBtn = document.getElementById("playPauseBtn");

slider.value = 0;


function searchLocation() {
  const location = eID('locationInput').value;
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${mapboxgl.accessToken}`)
    .then(response => response.json())
    .then(data => {
      const coordinates = data.features[0].center;
      const lng = coordinates[0];
      const lat = coordinates[1];
      const cityName = data.features[0].text;


      if (map) {
        map.flyTo({
          center: [lng, lat],
          essential: true
        });
      } else {
        map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [lng, lat],
          zoom: 10
        });
      }

      if (marker) {
        marker.setLngLat([lng, lat]);
      } else {
        marker = new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .addTo(map);
      }

      fetchWeatherData(cityName);
    })
    .catch(error => console.error('Error:', error));
}

function fetchWeatherData(cityName) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${openWeatherApiKey}`)
    .then(response => response.json())
    .then(data => {

      mTemp=[];
      mTemp=data;
      slider.max=mTemp.list.length;
      eID('cityName').textContent = cityName;
      eID('temperature').textContent = 'Forecast: (press play button)'; //`Temperature: ${getF(mTemp.list[0].main.temp)}`;
      eID('weatherDescription').textContent = `Current: ${getF(mTemp.list[0].main.temp)} ${mTemp.list[0].weather[0].description}`;

    })
    .catch(error => console.error('Error:', error));
}

function getF(temp,formatted=1){
  return Math.round(((temp-273) * 9/5) + 32) + (formatted?'°F':0);
}

function updateTemperature() {
  var value = parseInt(slider.value);
  var temperature = mTemp.list[Math.floor(value)];
  var weather=mTemp.list[Math.floor(value)].weather[0].description;
  temperatureElement.textContent = "Forecast at " + temperature.dt_txt + ": " + getF(temperature.main.temp) + " " + weather;
}

function playPause() {
  if (isPlaying) {
    clearInterval(sliderInterval);
    isPlaying = false;
    playPauseBtn.textContent = "Play";
  } else {
    sliderInterval = setInterval(function() {
      slider.value++;
      if (parseInt(slider.value) >= parseInt(slider.max)) slider.value = slider.min;
      updateTemperature();
    }, 100);
    isPlaying = true;
    playPauseBtn.textContent = "Pause";
  }
}


function checkWeatherConflict(activityJSON=eID('activityInput').value) {
  var jsonString =activityJSON;// '{"maxTemperature":70,"minTemperature":60,"activity": "Hike","startHour": 10, "endHour": 20}';
  var jsonObject = JSON.parse(jsonString);

  eID('conflicts').textContent='';
  for (var i = 0; i < mTemp.list.length; i++) {
    let temp=getF(mTemp.list[i].main.temp,0);
    if ( temp> jsonObject.maxTemperature || temp < jsonObject.minTemperature) {
      if (mTemp.list[i].weather[0].description.toLowerCase().includes("rain")) {
        eID('conflicts').textContent=eID('conflicts').textContent + '\n' + "Bad weather:" + mTemp.list[i].dt_txt;
      }
    }
  }
}

/**************************************EVENTS*****************************************************/
slider.addEventListener("input", updateTemperature);
playPauseBtn.addEventListener("click", playPause);

function eID(id) {
  if (typeof id === 'string') {
      if (id.charAt(0) === '#') id=id.substring(1);
      return document.getElementById(id);
  } else if (id instanceof HTMLElement) {
      return id;
  } else {
      return null;
  }
}



document.addEventListener("DOMContentLoaded", function() {
  eID("locationInput").value = "San Francisco";
  searchLocation();
});

eID('locationInput').addEventListener('change', function(event) {
  searchLocation();
});
