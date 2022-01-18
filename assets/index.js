
  google.maps.event.addDomListener(window, 'load', initAutocomplete); 
  function initAutocomplete(){
    autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      {
        types: ['(cities)'],
        componentRestrictions: {'country': ['us']}
      });
  }

$(function(){
  var searchForm = document.querySelector('#search-form');
  var searchInput = document.querySelector('#autocomplete');
  var modalButton = document.querySelector('#modalButton');
  var modal = document.querySelector('#modal');
  var logoCanvas = document.getElementById('logo');

  var restName = document.getElementById("restaurantName");
  var restRating = document.getElementById("restaurantRating");
  var restStatus = document.getElementById("restaurantStatus");
  var restAddress = document.getElementById("restaurantAddress");
  var restNumber = document.getElementById("restaurantNumber");
  var restPhoto = document.getElementById("restaurantPhoto");
  var restHistory = document.getElementById("restaurantHistory");


  $("#restaurantSection").attr("style", "display:none");


  var savedRestList = [];
  var savedIndex = 0;
  // google.maps.event.addDomListener(window, 'load', initAutocomplete); 
  // function initAutocomplete(){
  //   autocomplete = new google.maps.places.Autocomplete(
  //     document.getElementById('autocomplete'),
  //     {
  //       types: ['(cities)'],
  //       componentRestrictions: {'country': ['us']}
  //     });
  // }

  //event listener for modal button
  $(modalButton).on("click", closeModal);

  //function to close modal
  function closeModal() {
    modal.remove("is-active");
  }

  var formSubmitHandler = function(event){
    event.preventDefault();
    var city = searchInput.value;
    citySplit = city.split(',');
    cityName = citySplit[0];
    
    var budgetSelect = document.getElementById('budget-list');
    var budget = budgetSelect.options[budgetSelect.selectedIndex].value;

    var foodTypeSelect = document.getElementById('food-type-list');
    var foodType = foodTypeSelect.options[foodTypeSelect.selectedIndex].value;


    logoCanvas.classList.add('hide');

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

            // sets the restaurant section to be visible
            $("#restaurantSection").attr("style", "display:visible");
            // sets the contents of the restaurant name and rating
            restName.textContent = restaurantIndex.name;
            restRating.textContent = restaurantIndex.rating;

            // converts the false/true into actual open and closed content
            var open;
            if(restaurantIndex.is_closed === false) {
              open = "Currently Open";
            } else {
              open = "Currently Closed";
            }
            // assigns the contents of status, address, phone number, and photo
            restStatus.textContent = open;
            restAddress.textContent = restaurantIndex.location.address1 + ", " + restaurantIndex.location.city + ", "
                                        + restaurantIndex.location.state + " " + restaurantIndex.location.zip_code;
            restNumber.textContent = restaurantIndex.display_phone;

            restPhoto.setAttribute("src", restaurantIndex.image_url);

            // restaurant object prototype
            var previousRestaurant = {
              name: restName.textContent,
              rating: restRating.textContent,
              status: restStatus.textContent,
              address: restAddress.textContent,
              number: restNumber.textContent,
              photo: restaurantIndex.image_url
            };
            // pushes the current restautant object to the back of the localstorage key
            savedRestList.push(previousRestaurant);
            // Creates a key for the values and converts the object into a string
            localStorage.setItem("savedRestList", JSON.stringify(savedRestList));

            appendList();
            savedIndex++;
          })
  }

  // Appends a restaurant button to the list after each submit
  function appendList() {
    var newListItem = document.createElement("button"); // creates button element
    newListItem.innerHTML = restName.textContent;       // displays the name of the restaurant on the button
    var newIndex = savedIndex;                          // sets a placeholder for the index so increments won't affect the other indexes
    newListItem.setAttribute("data-count", newIndex);   // sets a count for a specific button
    newListItem.setAttribute("class", "button is-light"); // sets saved restaurant as a class with button styling
    newListItem.addEventListener("click", displayPrev); // adds an event listener to the button
    restHistory.appendChild(newListItem);               // appends the button on the list

  }

  // function will display the restaurant info of the button pressed
  function displayPrev(event) {
    event.preventDefault(); // stops page refresh

    // parses the local storage so it's usable
    var restParsed = JSON.parse(localStorage.getItem("savedRestList"));
    // takes the data-count attribute and uses it as an index in this function
    var buttonIndex = event.target.attributes[0].nodeValue;
    // takes the restaurant data in local storage and set it as the restaurant details in the DOM
    restName.textContent = restParsed[buttonIndex].name;
    restRating.textContent = restParsed[buttonIndex].rating;
    restStatus.textContent = restParsed[buttonIndex].status;
    restAddress.textContent = restParsed[buttonIndex].address;
    restNumber.textContent = restParsed[buttonIndex].number;
    restPhoto.setAttribute("src", restParsed[buttonIndex].photo);
  }

  //Logo using Zdog api and Anime api

  const {
    Illustration, Ellipse, Rect, Shape, Group, Anchor,
  } = Zdog;

  // set up the illustration within the existing canvas element
  const illustration = new Illustration({
    element: 'canvas',
    dragRotate: true,
  });

  // shadow for the logo
  const shadow = new Ellipse({
    addTo: illustration,
    diameter: 100,
    stroke: false,
    fill: true,
    color: '#B2B2B2',
    translate: { x: 50, y: 100 },
    rotate: { x: Math.PI / 1.7 },
  });

  // include an anchor point for the plate
  // ! position the star atop the anchor, to have the rotation occur around this point
  const starAnchor = new Anchor({
    addTo: illustration,
    translate: { y: 100 },
    rotate: { z: Math.PI / 10 },
  });

  // draw a circle in a group element positioned atop the anchor point
  const starGroup = new Group({
    addTo: starAnchor,
    translate: { x: -70, y: -170 }, // -70 to center the 140 wide shape
  });

  // main object for the plate
  const plate = new Zdog.Cylinder({
    addTo: starGroup,
    diameter: 100,
    stroke: 20,
    translate: { x: 70, y: 70 },
    color: '#EDEDED',
  });
  // shadow for plate
  const plate1 = new Zdog.Cylinder({
    addTo: starGroup,
    diameter: 80,
    stroke: 10,
    translate: { x: 70, y: 70, z:1 },
    color: '#E4E4E4',
  });
  //utensil objects set to the side of the plate
  const fork = new Zdog.Shape({
    addTo: starGroup,
    path: [
      { y: 30 },
      { y: -30}
    ],
    translate: {x: -10, y: 70},
    stroke: 20,
    color: '#D6D0CF'
  });
  const spoon = new Zdog.Shape({
    addTo: starGroup,
    path: [
      { y: 30 },
      { y: -30}
    ],
    translate: {x: 150, y: 70},
    stroke: 20,
    color: '#D6D0CF'
  });
  // include a group for the eyes, positioned halfway through the height of the star
  const eyesGroup = new Group({
    addTo: starGroup,
    translate: { x: 70, y: 72.5, z: 20 },
  });

  // add black circles describing the contour of the eyes, and either end of the star
  const eye = new Ellipse({
    addTo: eyesGroup,
    diameter: 5,
    stroke: 15,
    translate: { x: -32.5 },
    color: 'hsl(0, 0%, 0%)',
  });
  eye.copy({
    translate: { x: 32.5 },
  });

  // add an anchor point for the white part of the eyes
  // by later translating the white part of the eyes, the rotation allows to have the circle rotate around the anchor point
  const leftEyeAnchor = new Anchor({
    addTo: eyesGroup,
    translate: { x: -32.5, z: 0.5 },
  });
  const leftEye = new Ellipse({
    addTo: leftEyeAnchor,
    diameter: 1,
    stroke: 5,
    color: 'hsl(0, 100%, 100%)',
    translate: { x: -3.5 },
  });

  // copy the left anchor for the right side
  const rightEyeAnchor = leftEyeAnchor.copyGraph({
    translate: { x: 32.5, z: 0.5 },
  });

  // include an anchor point for the mouth
  // by centering the mouth around the anchor and scaling the anchor itself, the change in size occurs from the center of the mouth
  const mouthAnchor = new Anchor({
    addTo: starGroup,
    translate: { x: 70, y: 95, z: 20 },
    scale: 0.8,
  });
  // draw a mouth with a line and arc commands
  const mouth = new Shape({
    addTo: mouthAnchor,
    path: [
      { x: -8, y: 0 },
      { x: 8, y: 0 },
      {
        arc: [
          { x: 4, y: 6 },
          { x: 0, y: 6 },
        ],
      },
      {
        arc: [
          { x: -4, y: 6 },
          { x: -8, y: 0 },
        ],
      },
    ],
    stroke: 10,
    color: 'hsl(358, 100%, 65%)',
  });

  illustration.updateRenderGraph();

  // create an object describing the values for the different elements
  const starObject = {
    star: Math.PI / 10,
    shadow: 50,
    mouth: 0.8,
    eyes: 0
  }

  // set up a repeating animation which constantly updates the illustration and updates the desired transform properties according to the object's values
  const timeline = anime.timeline({
    duration: 1100,
    easing: 'easeInOutQuart',
    direction: 'alternate',
    loop: true,
    update: () => {
      starAnchor.rotate.z = starObject.star;
      shadow.translate.x = starObject.shadow;
      mouth.scale = starObject.mouth;
      leftEyeAnchor.rotate.z = starObject.eyes;
      rightEyeAnchor.rotate.z = starObject.eyes;

      illustration.updateRenderGraph();
    }
  });

  // animate the star with a slightly more pronounced easing function
  timeline.add({
    targets: starObject,
    star: -Math.PI/10,
    easing: 'easeInOutQuint',
  });
  // have the shadow follow with a small delay
  timeline.add({
    targets: starObject,
    delay: 20,
    shadow: -50,
  }, '-=1100')

  // with a smaller duration and slightly postponed, animate the mouth and the eyes
  timeline.add({
    targets: starObject,
    mouth: 1.2,
    duration: 300,
  }, '-=800');

  timeline.add({
    targets: starObject,
    eyes: Math.PI / 2,
    duration: 900,
  }, '-=1000');
});