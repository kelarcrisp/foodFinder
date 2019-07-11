import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { RestaurantSearch } from "./backend.js";



$(document).ready(function(){


  if (localStorage.username)
  {
    $('.login-page').hide();
  }

  $("#search").click(function(event){

    let cuisineID = $("#cuisineID").val();
    work(cuisineID)
  });
  $("#Breakfast").click(function(event){
    let cuisineID = "breakfast"
    work(cuisineID)
  });
  $('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
  });
  $('.signIn').click(function(){
    localStorage.setItem('username','true');
    $('.login-page').hide();
  });


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
                <div class='map-box'>
                map goes here
                </div>
              </div>
            </div>
            <br>`);
          $("#testout").slideDown();
          $('.bar').hide();
        }
      } else {
        //console.log(typeof deetsPromise);
        deetsPromise.then((restaurant) => {
          $("#testout").hide();
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
                  <div class='map-box'>
                  map goes here
                  </div>
                </div>
              </div>
              <br>`);
            $("#testout").slideDown()
            $('.bar').hide();
          }
        });
      } //end of localStorage check
    });
  }


  $("#Lunch").click(function(event){
    let cuisineID = "lunch"
    work(cuisineID);
  });

  $("#Dinner").click(function(event){
    let cuisineID = "Dinner"
    work(cuisineID);
  });
  $("#TakeOut").click(function(event){
    let cuisineID = "takeout"
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
});
