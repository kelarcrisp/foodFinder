import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { RestaurantSearch } from './backend.js';

$(document).ready(function(){
$("#search").click(function(event){
let cuisineID = $("#cuisineID").val();

let search = new RestaurantSearch;
let location = search.getLocationID($("#userLocation").val());
let cuisine = search.getLocationID($("#cuisineID").val());

location.then(function(response){
  let body = JSON.parse(response);
  let entityID = body.location_suggestions[0].entity_id;
  let entityType = body.location_suggestions[0].entity_type;
  let deetsPromise =  search.cuisineSearch(entityID, entityType, cuisineID);

  // cuisine.then(function(response){
  //   let body = JSON.parse(response);
  //   let name = body.restaurants[0].restaurant.name;
    
  // })

  $(".page1").hide();
  $(".page2").show(); 


  // call function returns array of restaurant objects
  // let restaurantList = [{"Little Restaurant", "123 Main", "Italian", "www.someweb.com"}, {"Little Restaurant", "123 Main", "Italian", "www.someweb.com"}];
  // for loop to show restaurant deets
    


  deetsPromise.then((restaurant) => {
    for(var i = 0; i < restaurant.length; i++){
      // $("#restaurantTitle").append(restaurant[i].name);
      // $("#restaurantInfo").append(restaurant[i].hours);
      // $("#restaurantInfo").append(restaurant[i].rating);
      // $("#restaurantInfo").append(restaurant[i].url);

      ``   

      $("#testout").append(`<div class='card-header test'> ${restaurant[i].name}</div><br> <div class=card-body>Hours: ${restaurant[i].hours}
      <br>rating: ${restaurant[i].rating}<br>url: <a href ="${restaurant[i].url}"></div><br>`);

    }
  })



});
});
});