# feed-me

The overall objective of using our application is have a restaurant randomly shown to the user after they input city name, type of cost, and type of restaurant. The users may use our application for when they can't decide on a single restaurant, so they let this restaurant randomizer select it for them.

Make sure ad blockers are off.

When the user loads the website, they are presented with a modal that prompts them to follow this link to request access to the demo server. Without this, the api calls wouldn't work properly. After they return to the website, they can click the x button on the top right. The user should be able to click on the box that has the placeholder "Enter City" and be able to type in a city, and an autocomplete suggestion list should appear. The user can also choose on a scale of 1-4 which gauges the cost of the food on a general scale. They can also choose the type of restaurant. Omitting the cost or the type of restaurant would output restaurants of the entire spectrum.

When the user presses the submit button, the API calls sends a request and brings back a promise that can be converted into the actual data. A random number generator is used to create the index necessary for accessing the restaurant's information. The current restaurant's information will be stored on local storage, and a button with the restaurant's name will be created and appended below the input boxes. The buttons individually point to the information stored on local storage and will display the previously viewed restaurant's information when clicked on.

### Prerequisites

Please disable ad blockers like AdBLock or Ublock when using the webpage. It disrupts the use of the API calls.

## Built With

* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [Bulma CSS Framework](https://bulma.io/documentation/)
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [jQuery](https://api.jquery.com/)
* [Yelp Fusion API](https://www.yelp.com/developers/documentation/v3/get_started)
* [Google Places API](https://developers.google.com/maps/documentation/javascript/places-autocomplete)
* [Google Maps API](https://developers.google.com/maps)
* [Anime.js](https://animejs.com/documentation/)
* [Zdog API](https://zzz.dog/api)

## Deployed Link

* [See Live Site](https://pentazoned.github.io/feed-me/)

## Screenshots and Gifs

* ![Gif](https://github.com/PentaZoned/feed-me/blob/main/assets/images/demonstration.gif)
* ![Screenshot1](https://github.com/PentaZoned/feed-me/blob/main/assets/images/screenshot1.jpg)
* ![Screenshot2](https://github.com/PentaZoned/feed-me/blob/main/assets/images/screenshot2.jpg)
* ![Screenshot3](https://github.com/PentaZoned/feed-me/blob/main/assets/images/screenshot3.jpg)
* ![Screenshot4](https://github.com/PentaZoned/feed-me/blob/main/assets/images/screenshot4.jpg)
* ![Screenshot5](https://github.com/PentaZoned/feed-me/blob/main/assets/images/screenshot5.jpg)



## Authors

* **Bradley Le** 

- [Link to Portfolio Site](https://pentazoned.github.io/portfolio-1/)
- [Link to Github](https://github.com/PentaZoned)
- [Link to LinkedIn](https://www.linkedin.com/in/bradley-le-/)

* **Laura Gupta** 

- [Link to Portfolio Site](https://lauragupta.github.io/resumepage/)
- [Link to Github](https://github.com/lauragupta?tab=repositories)
- [Link to LinkedIn](https://www.linkedin.com/in/laura-gupta-5a277158/)


* **Jose Pascual** 

- [Link to Portfolio Site](https://plotinusspascual.github.io/my-portfolio/)
- [Link to Github](https://github.com/plotinusspascual)
- [Link to LinkedIn](https://www.linkedin.com/in/jose-plotinuss-pascual/)


## License

This project is licensed under the MIT License 

