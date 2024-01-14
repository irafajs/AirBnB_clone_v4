$(document).ready(function () {
  let amenityIds = [];
  let stateCityIds = [];

  $('input[type="checkbox"]').change(function () {
    const id = $(this).data('id');
    const name = $(this).data('name');

    if ($(this).is(':checked')) {
      if ($(this).hasClass('state-city-checkbox')) {
        stateCityIds.push({ id, name });
      } else {
        amenityIds.push(id);
      }
    } else {
      if ($(this).hasClass('state-city-checkbox')) {
        stateCityIds = stateCityIds.filter(function (item) {
          return item.id !== id;
        });
      } else {
        amenityIds = amenityIds.filter(function (item) {
          return item !== id;
        });
      }
    }

    updateAmenitiesList();
    updateLocationsList();
  });

  function updateAmenitiesList () {
    const amenitiesHeader = $('.amenities h4');
    const amenitiesList = amenityIds.map(function (id) {
      return $('input[data-id="' + id + '"]').data('name');
    }).join(', ');

    amenitiesHeader.text('Selected Amenities: ' + amenitiesList);
  }

  function updateLocationsList () {
    const locationsHeader = $('.locations h4');
    const locationsList = stateCityIds.map(function (item) {
      return item.name;
    }).join(', ');

    locationsHeader.text('Selected Locations: ' + locationsList);
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

  function loadPlaces () {
    $.ajax({
      url: 'http://127.0.0.1:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({}),
      dataType: 'json',
      success: function (data) {
        $('SECTION.places article').remove();

        data.forEach(function (place) {
          $('SECTION.places').append(`
            <article>
              <h2>${place.name}</h2>
              <div class="price_by_night">
                <p>${place.price_by_night}</p>
              </div>
              <div class="information">
                <div class="max_guest">
                  <div class="guest_image"></div>
                  <p>${place.max_guest}</p>
                </div>
                <div class="number_rooms">
                  <div class="bed_image"></div>
                  <p>${place.number_rooms}</p>
                </div>
                <div class="number_bathrooms">
                  <div class="bath_image"></div>
                  <p>${place.number_bathrooms}</p>
                </div>
              </div>
              <div class="description">
                <p>${place.description}</p>
              </div>
            </article>
          `);
        });
      },
      error: function (error) {
        console.error('Error loading places:', error);
      }
    });
  }

  $('button').click(function () {
    $.ajax({
      url: 'http://127.0.0.1:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        amenities: amenityIds,
        states_cities: stateCityIds
      }),
      dataType: 'json',
      success: function (data) {
        $('SECTION.places article').remove();

        data.forEach(function (place) {
          $('SECTION.places').append(`
            <article>
              <h2>${place.name}</h2>
              <div class="price_by_night">
                <p>${place.price_by_night}</p>
              </div>
              <div class="information">
                <div class="max_guest">
                  <div class="guest_image"></div>
                  <p>${place.max_guest}</p>
                </div>
                <div class="number_rooms">
                  <div class="bed_image"></div>
                  <p>${place.number_rooms}</p>
                </div>
                <div class="number_bathrooms">
                  <div class="bath_image"></div>
                  <p>${place.number_bathrooms}</p>
                </div>
              </div>
              <div class="description">
                <p>${place.description}</p>
              </div>
            </article>
          `);
        });
      },
      error: function (error) {
        console.error('Error searching places:', error);
      }
    });
  });

  checkAPIStatus();

  setInterval(checkAPIStatus, 5000);
  loadPlaces();
});
