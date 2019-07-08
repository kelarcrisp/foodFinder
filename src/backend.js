//need variable in frontEnd that = new RestaurantSearch;
export class RestaurantSearch {

//this grabs locations 'Zomato ID', need a variable in frontEnd that stores this value for example: `result = body.location_suggestions[0].entity_id`
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
//grabs list of restaurants defined by city search and cuisine input, need variable to store this list.
  cuisineSearch (entity_id, entity_type, cuisine) {
    return new Promise(function(resolve, reject){
    let request2 = new XMLHttpRequest();
    let url = `https://cors-anywhere.herokuapp.com/https://developers.zomato.com/api/v2.1/search?entity_id=${entity_id}&entity_type=${entity_type}&sort=rating&order=desc`;
    if (cuisine) {
      let url = `https://cors-anywhere.herokuapp.com/https://developers.zomato.com/api/v2.1/search?entity_id=${entity_id}&entity_type=${entity_type}&q=${cuisine}&sort=rating&order=desc`;
    }
    console.log("url "+url);
    request2.onload = function() {
      if (this.status === 200) {
        resolve(request2.response);
      } else {
        reject(Error(request2.statusText));
      }
    };
    request2.open("GET", url, true);
    request2.setRequestHeader("user-key", `${process.env.API_KEY}`);
    request2.send();
    })
  }

}

// getRestaurantDetails(restaurant) {
//
// }


//always pull location --> required
//cuisine type --> optional
//sort by review --> required

//store info??


//6d98f34515e17a4905a4d39e114ef8e1 OTHER API KEY
//restaurant search has cost and distance
//establishments use location id
//grab entity id from location search
