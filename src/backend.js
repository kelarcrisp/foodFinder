//need variable in frontEnd that = new RestaurantSearch;

//all searches automatically sort by rating in descending order (first 10 results = top  ten starting with #1 - best)

export class RestaurantSearch {

//this grabs locations 'Zomato ID', need a variable in frontEnd that stores values for entity_id & entity_type for example: `entityID = body.location_suggestions[0].entity_id`

//this is miniaml required information to pull restaurants list
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

//grabs list of restaurants defined by city search above and cuisine input, need variable to store this list.
  cuisineSearch (entity_id, entity_type, cuisine) {
    return new Promise(function(resolve, reject){
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
  }

//stores restaurant name, hours, rating, url in an array of arrays for use in frontEnd
  // getRestaurantDetails(restaurants) {
  //   for (let i = 0; i < restaurants.length; i++) {
  //     //loop to store information as array or object
  //   }
  // }

}



//always pull location --> required
//cuisine type --> optional


//store info??


//6d98f34515e17a4905a4d39e114ef8e1 OTHER API KEY
//restaurant search has cost and distance
//establishments use location id
//grab entity id from location search
