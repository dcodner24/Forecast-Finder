// api call example
// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

// Coordinates Call
// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}

const apiKey = "614be3f63a8157b983e7ea5ed4d2b487"
let locations;
let recentSearches = {
  city: [],
  lat: [],
  lon: []
}

onLoad();








function onLoad() {
  loadLocalStorage();
  // Loads a default location (my hometown)
  // Could be improved later by grabbing user ip and updating current location dynamically.
  loadWeather(30.9498688, -95.9127773);
  $('#searchBtn').on('click', getLatLon);
}

function loadLocalStorage() {
  if (JSON.parse(localStorage.getItem('recentSearches'))) {
    recentSearches = JSON.parse(localStorage.getItem('recentSearches'));
  }
  else {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }
}


// Gets the lat and lon for new location search
function getLatLon() {
  $('#searchModal').modal('hide');
  let userSearch = $('#cityInput').val();
  $('#cityInput').val("")

  fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + userSearch + "&limit=5&appid=" + apiKey)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      locations = data;
      let i = 0;
      console.log(locations);

      $('.cityBtn').each(function () {
        $(this).text(locations[i].name + ", " + locations[i].state);
        i++;
      })
      $('#validationModal').modal('show');
    })
}

// Loads the coordinates of the selected location from the validation modal
function newLocation(index) {
  const currentLat = locations[index].lat;
  const currentLon = locations[index].lon;
  const currentCity = $(`#location${index}`).text();

  rotateRecents(currentLat, currentLon, currentCity)


  // Example of how to pull info off of the button clicked
  // console.log($(`#location${index}`).text())

  $('#validationModal').modal('hide');
  loadWeather(currentLat, currentLon);
}


// Loads weather onto page based on supplied cooordinates
function loadWeather(lat, lon) {
  $('#searchModal').modal('hide');
  fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      // Filter api return to capture noon on each day
      // (For use in 5 day forecast)
      let weatherData5 = data.list.filter((element) => element.dt_txt.includes("15:00:00"));
      console.log(weatherData5);

      imgUrl = 'https://openweathermap.org/img/wn/'
      $('img')

      let i = 0
      $('.card-title').each(function () {
        $(this).text(moment.unix(weatherData5[i].dt).format('L'));
        i++;
      })

      i = 0
      $('.card-icon').each(function () {
        $(this).empty();
        $(this).append('<img src="https://openweathermap.org/img/wn/' + weatherData5[i].weather[0].icon + '@2x.png"alt="' + weatherData5[i].weather[0].description + '">');
        i++;
      })

      i = 0
      $('.card-temp').each(function () {
        $(this).text(weatherData5[i].main.temp + '\u00B0' + 'F');
        i++;

      })

      i = 0
      $('.card-wind').each(function () {
        $(this).text(weatherData5[i].wind.speed + ' mph');
        i++;
      })

      i = 0
      $('.card-hum').each(function () {
        $(this).text(weatherData5[i].main.humidity + '%');
        i++;
      })

      $('#cityName').text(data.city.name);
    })

  // Seperate call for one-forecast data (Gives current data for given coordinates, limited to 1000 calls/day for free before being charged)
  fetch("https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=hourly,daily,minutely,alerts&appid=" + apiKey)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      currentData = data;
      $('#currentDate').text(moment.unix(currentData.current.dt).format('L'));
      $('#currentIcon').empty();
      $('#currentIcon').append('<img src="https://openweathermap.org/img/wn/' + currentData.current.weather[0].icon + '@2x.png" alt="' + currentData.current.weather[0].description + '">');
      $('#temp0').text(currentData.current.temp + '\u00B0' + 'F');
      $('#wind0').text(currentData.current.wind_speed + 'mph');
      $('#hum0').text(currentData.current.humidity + '%');

    })
  loadRecentButtons()
}


function loadRecentButtons() {
  for (var i = 0; i < recentSearches.city.length; i++) {
    $(`#recent${i}`).text(recentSearches.city[i]);
    $(`#recent${i}`).css('display', 'inline');
  }
}

function rotateRecents(lat, lon, city) {
  // Does a check to see if the arrays are at capacity
  if (recentSearches.city.length < 4 && recentSearches.lat.length < 4 && recentSearches.lon.length < 4) {
    // Pushes the newest search to the end of the buttons
    recentSearches.city.push(city);
    recentSearches.lat.push(lat);
    recentSearches.lon.push(lon);
    console.log(recentSearches);
  }
  else {
    // Trims oldest search off of the buttons
    recentSearches.city = recentSearches.city.slice(1);
    recentSearches.lat = recentSearches.lat.slice(1);
    recentSearches.lon = recentSearches.lon.slice(1);

    // Pushes the newest search to the end of the buttons
    recentSearches.city.push(city);
    recentSearches.lat.push(lat);
    recentSearches.lon.push(lon);
    console.log(recentSearches);
  }
  localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
}









