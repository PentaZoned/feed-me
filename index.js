var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#autocomplete');
let autocomplete;
var modalButton = document.querySelector('#modalButton');
var modal = document.querySelector('#modal');

$("#restaurantSection").attr("style", "display:none");

function initAutocomplete(){
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete'),
    {
      types: ['(cities)'],
      componentRestrictions: {'country': ['us']}
    });
}
//event listener for modal button
$("#modalButton").on("click", closeModal);

function closeModal(event) {
console.log("it works");
modal.remove("is-active");
}

var formSubmitHandler = function(event){
  event.preventDefault();
  var city = searchInput.value;
  console.log(city);
  citySplit = city.split(',');
  console.log(citySplit[0]);
  cityName = citySplit[0];
  

  var checkedE1 = $('input:checked');
  var selected = [];
  $.each(checkedE1, function(){
    selected.push($(this).val());
  });
  console.log('Filter is :', selected.join(','));
  var filter = selected.join(',');
  console.log(filter.split(','));
  
  var filterSplit = filter.split(',');
  console.log(filterSplit = filter.split(','));
  
  var budget = filterSplit[0];
  console.log(budget);
  var foodType = filterSplit[1];
  console.log(foodType);
  // var splitBudget = budget.split(',');
  // console.log(splitBudget[0]);
  getYelpApi(cityName, budget, foodType);
}
searchForm.addEventListener('submit', formSubmitHandler);


//let queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search";

function getYelpApi(cityName, budget, foodType){
var token = 'Bearer uqPekTdjMxPwfPByRjaRhuSxoWXztbJfGo6_yHs6utX8o3e5WZPCxQM1DxsjrO-XhEj2sNaG7HMrxnhGvRihWa5iQI7mXvRlOM-w_XRXd3UxOMswA9Bxp_jIFBB-YHYx'
    var yelp_search_url = 'https://api.yelp.com/v3/businesses/search'
    var cors_anywhere_url = 'https://cors-anywhere.herokuapp.com'
      var requestObj = {
        'url': cors_anywhere_url + '/' + yelp_search_url,
        'data': {
                term: foodType,
                location: cityName,
                price: budget,
              },
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

          $("#restaurantSection").attr("style", "display:visible");

          $("#restaurantName").text("Restaurant Name: " + restaurantIndex.name);
          $("#restaurantRating").text("Rating: " + restaurantIndex.rating);

          var open;
          if(restaurantIndex.is_closed === false) {
            open = "Currently Open";
          } else {
            open = "Currently Closed";
          }

          $("#restaurantStatus").text("Status: " + open);
          $("#restaurantAddress").text("Address: " + restaurantIndex.location.address1 + ", " + restaurantIndex.location.city + ", "
                                      + restaurantIndex.location.state + " " + restaurantIndex.location.zip_code);
          $("#restaurantNumber").text("Phone Number: " + restaurantIndex.display_phone);

          $("#restaurantPhoto").attr("src", restaurantIndex.image_url);

        })
}
