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
  citySplit = city.split(',');
  console.log(citySplit[0]);
  cityName = citySplit[0];
  getYelpApi(cityName);
}
searchForm.addEventListener('submit', formSubmitHandler);


let queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search";

function getYelpApi(cityName){
var token = 'Bearer uqPekTdjMxPwfPByRjaRhuSxoWXztbJfGo6_yHs6utX8o3e5WZPCxQM1DxsjrO-XhEj2sNaG7HMrxnhGvRihWa5iQI7mXvRlOM-w_XRXd3UxOMswA9Bxp_jIFBB-YHYx'
    var yelp_search_url = 'https://api.yelp.com/v3/businesses/search'
    var cors_anywhere_url = 'https://cors-anywhere.herokuapp.com'
      var requestObj = {
        'url': cors_anywhere_url + '/' + yelp_search_url,
        'data': {term: 'restaurants', location: cityName},
        headers: {'Authorization': token},
        error: function(jqXHR, textStatus, errorThrown){
          console.log('AJAX error, jqXRH = ', jqXHR, ', textStatus =',
          textStatus, ', errorThrown = ', errorThrown)
        }
      }
      $.ajax(requestObj)
        .done(function(response){
          var array = response.businesses;
          var restaurantIndex = array[Math.floor(Math.random() * array.length)];
          console.log('response = ', array)
          console.log(restaurantIndex);
          $("#restaurantName").text("Restaurant Name: " + restaurantIndex.name);
          $("#restaurantRating").text("Rating: " + restaurantIndex.rating);
          $("#restaurantStatus").text("Status: " + restaurantIndex.is_closed);
          $("#restaurantAddress").text("Address: " + restaurantIndex.location);
          $("#restaurantNumber").text("Phone Number: " + restaurantIndex.display_phone);

        })
}
