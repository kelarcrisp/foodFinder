import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { RestaurantSearch } from "./backend.js";
const loadGoogleMapsApi = require('load-google-maps-api')
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
// import Map from 'pigeon-maps'
// import Marker from 'pigeon-marker'
// import Overlay from 'pigeon-overlay'

$(document).ready(function(){
//login box
  if (localStorage.username)
  {
    $('.login-page').hide();
  }
  $('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
  });
  $('.signIn').click(function(){
    localStorage.setItem('username','true');
    $('.login-page').hide();
  });
//end login box

//main search field
$("#search").click(function(event){

    let cuisineID = $("#cuisineID").val();
    work(cuisineID)
  });

//category buttons
  $("#Breakfast").click(function(event){
    let cuisineID = "breakfast"
    work(cuisineID)
  });
  $("#Lunch").click(function(event){
    let cuisineID = "lunch"
    work(cuisineID);
  });
  $("#Dinner").click(function(event){
    let cuisineID = "Dinner"
    work(cuisineID);
  });
  $("#TakeOut").click(function(event){
    let cuisineID = "take out"
    work(cuisineID);
  });
  $("#Delivery").click(function(event){
    let cuisineID = "delivery"
    work(cuisineID);
  });
  $("#Drinks").click(function(event){
    let cuisineID = "drinks"
    work(cuisineID);
  });
//collection buttons
  $("#trending").click(function(event){
    let cuisineID = "trending"
    work(cuisineID);
  });
  $("#happyHour").click(function(event){
    let cuisineID = "happyHour"
    work(cuisineID);
  });
  $("#burgers").click(function(event){
    let cuisineID = "burgers"
    work(cuisineID);
  });
  $("#lateNight").click(function(event){
    let cuisineID = "lateNight"
    work(cuisineID);
  });

//checks if localStorage is too full and clears
function checkStorage() {
  if (Object.keys(localStorage).length > 10) {
    localStorage.clear();
  }
}
//main search function to pull and print restaurants
function work(cuisineID){
    let search = new RestaurantSearch;
    let location = search.getLocationID($("#userLocation").val());


    location.then(function(response){
      let body = JSON.parse(response);
      let entityID = body.location_suggestions[0].entity_id;
      let entityType = body.location_suggestions[0].entity_type;
      let deetsPromise =  search.cuisineSearch(entityID, entityType, cuisineID);

      $(".page1").hide();
      $(".page2").show();
      $("#outputTitle").html(`<h2 class="outputResults">${cuisineID} results</h2>`);

//placeb---- progress bar
      let timer = 0
      let update_loop = setInterval(secCheck, 300);
      function secCheck() {
        if(timer < 100) {
          timer += 10;
          $('.bar').html(`<div class="progress-bar bg-info progress-bar-striped progress-bar-animated" aria-valuenow="${timer}"; style="width:${timer}%;height:20px">${timer}%</div>`);
        } else {
          clearInterval(update_loop);
        }
      }
// ==== end progress bar====
//checks if localStorage exists, if not calls API
      if (localStorage.getItem(`${entityID}${entityType}${cuisineID}`)) {
        let restaurant = deetsPromise;
        $("#testout").hide();
        // make the card for each restaurant
        for(var i = 0; i < restaurant.length; i++){
          $("#testout").append(`
          <div class='row card-body'>
              <div class='col-md-6 '>
                <div class='card-header test card-res'>
                  <img class="imageSize"src='${restaurant[i].image}'> ${restaurant[i].name}
                </div>

                <div class='card-res'>
                  Hours: ${restaurant[i].hours}
                  <br>
                  Rating: ${restaurant[i].rating}<br>
                  <a href="${restaurant[i].url}">${restaurant[i].name} Website</a>
                </div>
              </div>
              <div class='col-md-6'>
              <div class = 'map' id = 'map-box${i}'>
              </div>
              </div>
            </div>
            <br>`);
            mapboxgl.accessToken = `${process.env.MAP_KEY_2}`;
            let map = new mapboxgl.Map({
            container: `map-box${i}`, // container id
            style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
            center: [restaurant[i].long, restaurant[i].lat], // starting position [lng, lat]
            zoom: 15 // starting zoom
            });
          $("#testout").slideDown();
          $('.bar').hide();
        }
      } else {
        //console.log(typeof deetsPromise);
        deetsPromise.then((restaurant) => {
          $("#testout").hide();
          for(let i = 0; i < restaurant.length; i++){
            $("#testout").append(`
            <div class='row card-body'>
                <div class='col-md-6 '>
                  <div class='card-header test card-res'>
                    <img class="imageSize"src='${restaurant[i].image}'> ${restaurant[i].name}
                  </div>

                  <div class='card-res'>
                    Hours: ${restaurant[i].hours}
                    <br>
                    Rating: ${restaurant[i].rating}<br>
                    <a href="${restaurant[i].url}">${restaurant[i].name} Website</a>
                  </div>
                </div>
                <div class='col-md-6'>
                  <div class = 'map' id = 'map-box${i}'>
                  </div>
                </div>
              </div>
              <br>`);

              mapboxgl.accessToken = `${process.env.MAP_KEY_2}`;
              let map = new mapboxgl.Map({
              container: `map-box${i}`, // container id
              style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
              center: [restaurant[i].long, restaurant[i].lat], // starting position [lng, lat]
              zoom: 15 // starting zoom
              });
              let marker = new mapboxgl.Marker()
              marker.setLngLat([restaurant[i].long, restaurant[i].lat])
              marker.addTo(map);

            $("#testout").slideDown()
            $('.bar').hide();
          }
        });
      } //end of localStorage check
    });
  }



});
