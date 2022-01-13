var axios = require('axios');
var apiKey = "AIzaSyBxwVn_xN3XBP7GIbZc10HsMHAibonrlv4";
var config = {
  method: 'get',
  url: "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=" 
  + apiKey,
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});