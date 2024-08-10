$(document).ready(function () {
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
});
