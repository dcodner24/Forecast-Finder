// api call example
// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

// Coordinates Call
// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}

const apiKey = "614be3f63a8157b983e7ea5ed4d2b487"


let locations;



function getLatLon() {
  $('#searchModal').modal('hide');
  let userSearch = $('#cityInput').val();
  // let userSearch = "Madisonville"
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


function updateWeather(index) {
  const lat = locations[index].lat;
  const lon = locations[index].lon;

  $('#validationModal').modal('show');

  fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // Filter api return to capture noon on each day
      // (For use in 5 day forecast)
      let weatherData5 = data.list.filter((element) => element.dt_txt.includes("15:00:00"));


      imgUrl = 'https://openweathermap.org/img/wn/'
      $('img')

      let i = 0
      $('.card-title').each(function () {
        $(this).text(moment.unix(weatherData5[i].dt).format('L'));
        console.log(i)
        i++;
      })

      i = 0
      $('.card-icon').each(function () {
        $(this).text("");
        $(this).append('<img src="https://openweathermap.org/img/wn/' + weatherData5[i].weather[0].icon + '@2x.png">');
        i++;
      })

      i = 0
      $('.card-temp').each(function () {
        $(this).text(weatherData5[i].main.temp + '\u00B0' + 'F');
        console.log(i)
        i++;

      })

      i = 0
      $('.card-wind').each(function () {
        $(this).text(weatherData5[i].wind.speed + '  mph');
        console.log(i)
        i++;
      })

      i = 0
      $('.card-hum').each(function () {
        $(this).text(weatherData5[i].main.humidity + '%');
        console.log(i)
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
      $('#currentIcon').text("")
      $('#currentIcon').append('<img src="https://openweathermap.org/img/wn/' + currentData.current.weather[0].icon + '@2x.png" alt="' + currentData.current.weather[0].description + '">');
      $('#temp0').text(currentData.current.temp + '\u00B0' + 'F');
      $('#wind0').text(currentData.current.wind_speed + 'mph');
      $('#hum0').text(currentData.current.humidity + '%');

    })
}






// Loads a default location into the weather cards on page load
function loadWeather(lat, lon) {
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
        console.log(i)
        i++;
      })

      i = 0
      $('.card-icon').each(function () {
        $(this).append('<img src="https://openweathermap.org/img/wn/' + weatherData5[i].weather[0].icon + '@2x.png"alt="' + weatherData5[i].weather[0].description + '">');
        i++;
      })

      i = 0
      $('.card-temp').each(function () {
        $(this).text(weatherData5[i].main.temp + '\u00B0' + 'F');
        console.log(i)
        i++;

      })

      i = 0
      $('.card-wind').each(function () {
        $(this).text(weatherData5[i].wind.speed + ' mph');
        console.log(i)
        i++;
      })

      i = 0
      $('.card-hum').each(function () {
        $(this).text(weatherData5[i].main.humidity + '%');
        console.log(i)
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
      $('#currentIcon').append('<img src="https://openweathermap.org/img/wn/' + currentData.current.weather[0].icon + '@2x.png" alt="' + currentData.current.weather[0].description + '">');
      $('#temp0').text(currentData.current.temp + '\u00B0' + 'F');
      $('#wind0').text(currentData.current.wind_speed + 'mph');
      $('#hum0').text(currentData.current.humidity + '%');

    })

}


$('#searchBtn').on('click', getLatLon);
loadWeather(30.9498688, -95.9127773);



