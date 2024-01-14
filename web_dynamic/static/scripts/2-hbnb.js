$(document).ready(function () {
  let amenityIds = [];

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

  function checkAPIStatus () {
    $.ajax({
      url: 'http://127.0.0.1:5001/api/v1/status/',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        if (data.status === 'OK') {
          $('#api_status').addClass('available');
        } else {
          $('#api_status').removeClass('available');
        }
      },
      error: function (error) {
        console.error('Error checking API status:', error);
      }
    });
  }

  checkAPIStatus();

  setInterval(checkAPIStatus, 5000);
});
