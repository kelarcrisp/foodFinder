//need variable in frontEnd that = new RestaurantSearch;

//all searches automatically sort by rating in descending order (first 10 results = top  ten starting with #1 - best)

export class RestaurantSearch {

  //this grabs locations 'Zomato ID', need a variable in frontEnd that stores values for entity_id & entity_type for example: `entityID = body.location_suggestions[0].entity_id`

  //this is minimal required information to pull restaurants list
  getLocationID(location) {
    return new Promise(function(resolve,reject){
      let request = new XMLHttpRequest();
      let url = `https://cors-anywhere.herokuapp.com/https://developers.zomato.com/api/v2.1/locations?query=${location}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.setRequestHeader("user-key", `${process.env.API_KEY}`);
      request.send();
    })
  }

  //grabs list of restaurants defined by city search above and cuisine input
  //stores restaurant name, hours, rating, url in an array of arrays for use in frontEnd. need a variable to store the return (ex. let test = search.cuisineSearch(params))
  //can use this same code for the buttons
  cuisineSearch (entity_id, entity_type, cuisine) {
    let promise = new Promise(function(resolve, reject){
      let request = new XMLHttpRequest();
      let url = `https://cors-anywhere.herokuapp.com/https://developers.zomato.com/api/v2.1/search?entity_id=${entity_id}&entity_type=${entity_type}&q=${cuisine}&sort=rating&order=desc`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.setRequestHeader("user-key", `${process.env.API_KEY}`);
      request.send();
    })
    //this will store the necessary info for each restaurant as an object in an array [top 10]
    return promise.then(function(response){
      let deetsList = [];
      let body = JSON.parse(response);
      for (let i=0; i < 10; i++) {
        let source = body.restaurants[i].restaurant;
        let name = source.name;
        let hours = source.timings;
        let rating = source.user_rating.aggregate_rating;
        let url = source.url;
        let restaurant = new Restaurant (name, hours, rating, url);
       // console.log(restaurant);
        deetsList.push(restaurant);
      }
      //console.log(deetsList);
      return deetsList;
    })
  }
}


function Restaurant (name, hours, rating, url) {
  this.name = name,
  this.hours = hours,
  this.rating = rating,
  this.url = url
}


//always pull location --> required
//cuisine type --> optional


//store info??


//6d98f34515e17a4905a4d39e114ef8e1 OTHER API KEY
//restaurant search has cost and distance
//establishments use location id
//grab entity id from location search
