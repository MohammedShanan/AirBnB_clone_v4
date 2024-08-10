$(document).ready(function () {
  placeSearch({});
  let amenitiesObj = {};
  $(".amenities input").click(function (event) {
    let amenity = $(event.target);
    if (amenity.is(":checked")) {
      amenitiesObj[amenity.data("id")] = amenity.data("name");
    } else {
      delete amenitiesObj[amenity.data("id")];
    }
    amenitiesList = Object.values(amenitiesObj);
    $(".amenities h4").text(amenitiesList.join(", "));
  });

  $.get("http://0.0.0.0:5001/api/v1/status/", function (data, status) {
    if (status !== 200) {
      $("#api_status").removeClass("available");
    } else {
      if (data.status === "OK") {
        $("#api_status").addClass("available");
      } else {
        $("#api_status").removeClass("available");
      }
    }
  });
  $("#search_btn").click(function () {
    placeSearch({ amenities: Object.keys(amenitiesObj) });
  });
  function placeSearch(filter) {
    $(".places").empty();
    $.ajax({
      type: "POST",
      url: "http://localhost:5001/api/v1/places_search/",
      contentType: "application/json",
      data: JSON.stringify(filter),
      success: function (response) {
        console.log(response);
        let article = "";
        response.forEach(function (place) {
          article = `<article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">
              ${place.max_guest} Gest${place.max_guest != 1 ? "s" : ""}
            </div>
            <div class="number_rooms">
              ${place.number_rooms} Bedroom${place.number_rooms != 1 ? "s" : ""}
            </div>
            <div class="number_bathrooms">
              ${place.number_bathrooms} Bathroom${
            place.number_bathrooms != 1 ? "s" : ""
          }
            </div>
          </div>
        </article>`;
          $(".places").append(article);
        });
      },
    });
  }
});
