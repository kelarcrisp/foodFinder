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
    //checks for localStorage
    if (localStorage.getItem(`${entity_id}${entity_type}${cuisine}`)) {
      let local = localStorage.getItem(`${entity_id}${entity_type}${cuisine}`)
      let deetsList = [];
      let body = JSON.parse(local);
      for (let i=0; i < 10; i++) {
        let source = body.restaurants[i].restaurant;
        let lat = source.location.latitude;
        let long = source.location.longitude;
        let name = source.name;
        let hours = source.timings;
        let rating = source.user_rating.aggregate_rating;
        let url = source.url;
        let image = source.featured_image;
        let reviews = source.all_reviews.reviews;
        let address = [source.location.address, source.location.city, source.location.zipcode]
        let restaurant = new Restaurant (name, hours, rating, url, image, reviews, address, lat, long);
        deetsList.push(restaurant);
      }
      return deetsList;
    } else {                                                //calls API
      let promise = new Promise(function(resolve, reject){
        let query = `&q=${cuisine}`;
        if (cuisine === "trending") {
          query = `&collection_id=1`;
        }
        if (cuisine === "happyHour") {
          query = `&collection_id=339`;
        }
        if (cuisine === "burgers") {
          query = `&collection_id=5`;
        }
        if (cuisine === "lateNight") {
          query = `&collection_id=6`;
        }
        let request = new XMLHttpRequest();
        let url = `https://cors-anywhere.herokuapp.com/https://developers.zomato.com/api/v2.1/search?entity_id=${entity_id}&entity_type=${entity_type}${query}&radius=5000&sort=rating&order=desc`;
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
      return promise.then(function(response){
        let deetsList = [];
        let body = JSON.parse(response);
        for (let i=0; i < 10; i++) {
          let source = body.restaurants[i].restaurant;
          let lat = source.location.latitude;
          let long = source.location.longitude;
          let name = source.name;
          let hours = source.timings;
          let rating = source.user_rating.aggregate_rating;
          let url = source.url;
          let image = source.featured_image;
          let reviews = source.all_reviews.reviews;
          let address = [source.location.address, source.location.city, source.location.zipcode]
          let restaurant = new Restaurant (name, hours, rating, url, image, reviews, address, lat, long);
          deetsList.push(restaurant);
        }
        localStorage.setItem(`${entity_id}${entity_type}${cuisine}`, JSON.stringify(body));
        return deetsList;
      })
    }
    //this will store the necessary info for each restaurant as an object in an array [top 10]
  }
}


function Restaurant (name, hours, rating, url, image, reviews, address, lat, long) {
  this.name = name,
  this.hours = hours,
  this.rating = rating,
  this.url = url,
  this.image = image,
  this.reviews = reviews,
  this.address = address,
  this.lat = lat,
  this.long = long
}
