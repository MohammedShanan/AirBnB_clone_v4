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
});
