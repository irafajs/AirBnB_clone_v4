$(document).ready(function () {
  const amenityIds = [];

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      amenityIds.push(amenityId);
    } else {
      amenityIds = amenityIds.filter(function (id) {
        return id !== amenityId;
      });
    }

    updateAmenitiesList();
  });

  function updateAmenitiesList () {
    const amenitiesHeader = $('.amenities h4');

    const amenitiesList = amenityIds.map(function (id) {
      return $('input[data-id="' + id + '"]').data('name');
    }).join(', ');

    amenitiesHeader.text('Selected Amenities: ' + amenitiesList);
  }
});
