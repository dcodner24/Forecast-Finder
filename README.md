# Forecast Finder

## Description
---

The goal of this project was create a functional weather application for users to search a location and to be shown current weather data alongside a 5 day forecast.
<br>

## Usage
---
    On page load my hometown will be loaded into the weather app so that the page is populated with data. To search for a new city, the user must simply click the city button in the top right of the page, type the desired city, and click search. If the API responds to the city input into the search box, a modal will appear on screen prompting the user to select which city they want to display data for. Upon selecting the specific city from the Geocoding API call, they page will be updated with weather data. 
    ----
    If a user would like to load a recent search back onto the page, they can open the search modal again and they will see that the application has the last four recent searchles loaded in as buttons.
<br>

## Features
---
<ul>
<li>Current weather and 5 day forecast for any city recognized by the Geocoding API.</li>
<li>Modals used for searches for organized layout.</li>
<li>Input validation powered by the Geocoding API</li>
<li>Dynamically updating recent search buttons</li>
<li>Website is responsive from small mobile screens to 4k.</li>
</ul>
<br>


![App Demo](./assets/images/Forecast%20Finder%20Demo.gif)

## Future Development
---
<ul>
<li>Replace Geocoding API with an api that does not break when searching for places including 'city' in the name.</li>
<li>Addition of an api to get the users current location on page load and fill the page with more pertinent data.</li>
<li>Additon of keydown detection to allow users to press enter to search<li>
</ul>
<br>

## License
---

Please refer to the liscence in the repository.

<br><br>
Link to the deployed app:<br>
https://dcodner24.github.io/Forecast-Finder/