
var APIKey = "j4Wm80vbFD98XzxTP7oR4gYbX-P9w-hGhH_oQQf90hgdZ2eZB_ZTjjvbIJH_Vq2tY6Ds4BvtF7G5QAk8j2d6yXLIuDmyv5PHx1mvfT0e7QyvplNC2q-16M3utH3fYXYx";

var city = $("#cityName");

function randomizer() {

    var queryURL = "https://api.yelp.com/v3/businesses/search?location=" + city + "&appid=" + APIKey;

    fetch(queryURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
 
            var totalResults = data.total;
            var restaurantIndex = Math.floor(Math.random() * totalResults);
            
            $("#restaurantName").text(data.businesses[restaurantIndex].name);
            $("#restaurantRating").text(data.businesses[restaurantIndex].rating);
            $("#restaurantAddress").text(data.businesses[restaurantIndex].location);
        })
}

$("#randomizerButton").click(randomizer);