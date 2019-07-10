import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { RestaurantSearch } from "./backend.js";

$(document).ready(function() {
  $("#search").click(function() {
    let cuisineID = $("#cuisineID").val();
    work(cuisineID);
  });
  $("#Breakfast").click(function() {
    let cuisineID = "breakfast";
    work(cuisineID);
  });

  function work(cuisineID) {
    let search = new RestaurantSearch();
    let location = search.getLocationID($("#userLocation").val());

    location.then(function(response) {
      let body = JSON.parse(response);
      let entityID = body.location_suggestions[0].entity_id;
      let entityType = body.location_suggestions[0].entity_type;
      let deetsPromise = search.cuisineSearch(entityID, entityType, cuisineID);

      $(".page1").hide();
      $(".page2").show();
      $("#outputTitle").html(
        `<h2 class="outputResults">${cuisineID} results</h2>`
      );

      deetsPromise.then(restaurant => {
        for (var i = 0; i < restaurant.length; i++) {
          $("#testout").hide();
          $("#testout").append(`<div class='card-header test'><img class="imageSize"src='${restaurant[i].image}'> ${restaurant[i].name}</div><br> <div class=card-body>Hours: ${restaurant[i].hours}<br>Rating: ${restaurant[i].rating}<br><a href="${restaurant[i].url}">${restaurant[i].name} Website</div><br>`);
          $("#testout").slideDown(2000);
        }
      });
    });
  }
  $("#Lunch").click(function() {
    let cuisineID = "lunch";
    work(cuisineID);
  });

  $("#Dinner").click(function() {
    let cuisineID = "Dinner";
    work(cuisineID);
  });
  $("#TakeOut").click(function() {
    let cuisineID = "takeout";
    work(cuisineID);
  });
  $("#Delivery").click(function() {
    let cuisineID = "delivery";
    work(cuisineID);
  });
  $("#Drinks").click(function() {
    let cuisineID = "drinks";
    work(cuisineID);
  });

  $("#trending").click(function() {
    let cuisineID = "trending";
    work(cuisineID);
  });
  $("#happyHour").click(function() {
    let cuisineID = "happyHour";
    work(cuisineID);
  });
  $("#burgers").click(function() {
    let cuisineID = "burgers";
    work(cuisineID);
  });
  $("#lateNight").click(function() {
    let cuisineID = "lateNight";
    work(cuisineID);
  });
});
