import { RestaurantSearch } from './../src/backend.js'

describe('Testing location function', function(){

  it('should return a location response', function(){
    let location = "${userInput}";
    let search = new RestaurantSearch;
    let result = search.getLocationID(location);
    result.then (function(response){
      let body = JSON.parse(response);
      console.log(body);
      console.log(body.location_suggestions[0].entity_id);
      expect(body.location_suggestions[0].entity_id).toEqual(279);
    })
  })


  it('should return a list of restaurants',function(){
    let eId = 279;
    let eType = 'city';
    let cuisine = 'soul';
    let search = new RestaurantSearch;
    let restaurants = search.cuisineSearch(eId, eType, cuisine)
    restaurants.then (function(response){
      let body = JSON.parse(response);
      console.log(body);
      console.log(body.restaurants[0].restaurant.name);
      expect(body.restaurants[0].restaurant.name).toEqual('Pike Place Chowder');
    })
  })
})
