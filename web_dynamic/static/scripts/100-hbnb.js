$(document).ready(function () {
  placeSearch({});
  let filters = {
    states: {},
    cities: {},
    amenities: {},
  };

  $(".filters input").click(function (event) {
    let element = $(event.target);
    let type = element.data("type");
    let obj = filters[element.data("type")];
    if (element.is(":checked")) {
      obj[element.data("id")] = element.data("name");
    } else {
      delete obj[element.data("id")];
    }
    if (type == "states" || type == "cities") {
      let states = Object.values(filters.states);
      let cities = Object.values(filters.cities);
      $(".locations h4").text([...states, ...cities].join(", "));
    } else {
      let amenities = Object.values(filters.amenities);
      $(".amenities h4").text(amenities.join(", "));
    }
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
    placeSearch({
      amenities: Object.keys(filters.amenities),
      cities: Object.keys(filters.cities),
      states: Object.keys(filters.states),
    });
  });
  function placeSearch(filter) {
    $(".places").empty();
    $.ajax({
      type: "POST",
      url: "http://0.0.0.0:5001/api/v1/places_search/",
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
