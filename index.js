var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#autocomplete');
let autocomplete;

function initAutocomplete(){
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete'),
    {
      types: ['(cities)'],
      componentRestrictions: {'country': ['us']}
    });
}


var formSubmitHandler = function(event){
  event.preventDefault();
  var city = searchInput.value;
  console.log(city);
  cityName = city.split(',');
  console.log(cityName[0]);
  test = cityName[0];
  getYelpApi(test);
}
searchForm.addEventListener('submit', formSubmitHandler);


let queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search";

function getYelpApi(test){
var token = 'Bearer uqPekTdjMxPwfPByRjaRhuSxoWXztbJfGo6_yHs6utX8o3e5WZPCxQM1DxsjrO-XhEj2sNaG7HMrxnhGvRihWa5iQI7mXvRlOM-w_XRXd3UxOMswA9Bxp_jIFBB-YHYx'
    var yelp_search_url = 'https://api.yelp.com/v3/businesses/search'
    var cors_anywhere_url = 'https://cors-anywhere.herokuapp.com'
      var requestObj = {
        'url': cors_anywhere_url + '/' + yelp_search_url,
        'data': {term: 'restaurants', location: test},
        headers: {'Authorization': token},
        error: function(jqXHR, textStatus, errorThrown){
          console.log('AJAX error, jqXRH = ', jqXHR, ', textStatus =',
          textStatus, ', errorThrown = ', errorThrown)
        }
      }
      $.ajax(requestObj)
        .done(function(response){
          console.log('typeof response =' + typeof response)
          console.log('response = ', response)
        })
}




// API Key, this specific key is for testing purposes
var APIKey = "j4Wm80vbFD98XzxTP7oR4gYbX-P9w-hGhH_oQQf90hgdZ2eZB_ZTjjvbIJH_Vq2tY6Ds4BvtF7G5QAk8j2d6yXLIuDmyv5PHx1mvfT0e7QyvplNC2q-16M3utH3fYXYx";

var city = $("#cityName");

// function will use a fetch request to Yelp API to retrieve a promise and manipulate the data received
// and update the page with new restaurant details
// API used: https://www.yelp.com/developers/documentation/v3/business_search
function randomizer() {

    // Create the URL with the query parameters to be used in the fetch request
    var queryURL = "https://api.yelp.com/v3/businesses/search?location=" + city + "&appid=" + APIKey;

    // fetch request using the queryURL
    fetch(queryURL)
        .then(function(response) {
            // reads the response stream and returns a promise with the body text as JSON
            return response.json();
        })
        .then(function(data) {
 
            // grabs the total restaurant lisings
            var totalResults = data.total;
            // creates a random index using the total restaurant listings as the max
            var restaurantIndex = Math.floor(Math.random() * totalResults);
            
            // dynamically changes the set of restaurant data to the next random set
            // Yelp API documentation examples were used as references for creating the arguments instead of console logging the entire data
            var refRestaurant = data.businesses[restaurantIndex]; // This variable represents the random restaurant
            $("#restaurantName").text(refRestaurant.name);
            $("#restaurantRating").text(refRestaurant.rating);
            $("#restaurantAddress").text(refRestaurant.location.address1 + ", " + refRestaurant.location.city + ", " + refRestaurant.location.state
                                        + refRestaurant.zip_code);
        })
}

// Adds an event listener to the randomizer button, function will run when the button is clicked
$("#randomizerButton").click(randomizer);