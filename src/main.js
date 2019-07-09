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

  $(".page1").hide();
  $(".page2").show(); 

  deetsPromise.then((restaurant) => {
    for(var i = 0; i < restaurant.length; i++){
      $("#testout").append(`<div class='card-header test'> ${restaurant[i].name}</div><br> <div class=card-body>Hours: ${restaurant[i].hours}
      <br>rating: ${restaurant[i].rating}<br>url: <a href="${restaurant[i].url}">Website</div><br>`);
    }

  })



});
});
$("#Breakfast").click(function(event){
  let cuisineID = "breakfast"
   work(cuisineID) 
   });

function work(cuisineID){
    let search = new RestaurantSearch;
    let location = search.getLocationID($("#userLocation").val());
    let cuisine = search.getLocationID($("#cuisineID").val());
    
    location.then(function(response){
      let body = JSON.parse(response);
      let entityID = body.location_suggestions[0].entity_id;
      let entityType = body.location_suggestions[0].entity_type;
      let deetsPromise =  search.cuisineSearch(entityID, entityType, cuisineID);
    
      $(".page1").hide();
      $(".page2").show();
      $("#outputTitle").html(`<h2 class="outputResults">${cuisineID} results</h2>`)
    
      deetsPromise.then((restaurant) => {
        for(var i = 0; i < restaurant.length; i++){
          $("#testout").append(`<div class='card-header test'> ${restaurant[i].name}</div><br> <div class=card-body>Hours: ${restaurant[i].hours}
          <br>rating: ${restaurant[i].rating}<br>url: <a href="${restaurant[i].url}">Website</div><br>`)
  }
  
  
  
  
      });
    });
  }
  $("#Lunch").click(function(event){
    let cuisineID = "lunch"
     work(cuisineID) 
     });

  $("#Dinner").click(function(event){
      let cuisineID = "Dinner"
       work(cuisineID) 
       });
       $("#TakeOut").click(function(event){
        let cuisineID = "takeout"
         work(cuisineID) 
         });
         $("#Delivery").click(function(event){
          let cuisineID = "delivery"
           work(cuisineID) 
           });
           $("#Drinks").click(function(event){
            let cuisineID = "drinks"
             work(cuisineID) 
             });
          
            $("#trending").click(function(event){
                let cuisineID = "trending"
                 work(cuisineID) 
                 });
                 $("#happyHour").click(function(event){
                  let cuisineID = "hapoyHour"
                   work(cuisineID) 
                   });
                   $("#burgers").click(function(event){
                    let cuisineID = "burgers"
                     work(cuisineID) 
                     });
                     $("#lateNight").click(function(event){
                      let cuisineID = "lateNight"
                       work(cuisineID) 
                       });

  });