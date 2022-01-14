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