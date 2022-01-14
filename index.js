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

var API_BASE_URL = 'https://api.yelp.com/v3';
var BEARER_TOKEN = 'uqPekTdjMxPwfPByRjaRhuSxoWXztbJfGo6_yHs6utX8o3e5WZPCxQM1DxsjrO-XhEj2sNaG7HMrxnhGvRihWa5iQI7mXvRlOM-w_XRXd3UxOMswA9Bxp_jIFBB-YHYx';
//https://api.yelp.com/v3/businesses/search?term=burger&location=portland

function getYelpApi(test){
  jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
      options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
  });

  $.ajax({
    url: 'https://api.yelp.com/v3/business/search?term='
      + 'burger' 
      + '&location='
      + test,
    method: 'GET',
    headers: {
      authorization: '${BEARER_TOKEN}'
    }
  }).then(function(response){
    console.log(response)
  })

}