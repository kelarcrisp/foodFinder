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

location.then(function(response){
  let body = JSON.parse(response);
  let entityID = body.location_suggestions[0].entity_id;
  let entityType = body.location_suggestions[0].entity_type;
  let cuisine =  search.cuisineSearch(entityID, entityType, cuisineID);

cuisine.then(function(response){
  let body = JSON.parse(response);
  let name = body.restaurants[0].restaurant.name;

})

$(".page1").hide();
$(".page2").show(); 

// call function returns array of restaurant objects
// let restaurantList = [{"Little Restaurant", "123 Main", "Italian", "www.someweb.com"}, {"Little Restaurant", "123 Main", "Italian", "www.someweb.com"}];
// for loop to show



// $("#restaurantTitle").text(


})
});
});