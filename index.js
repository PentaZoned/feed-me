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
}
searchForm.addEventListener('submit', formSubmitHandler);