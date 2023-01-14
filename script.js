'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

///////////////////////////////////////////////////////
///// USING THE GEOLOCATION API (it's browser API)
/// two callbacks, one for success (with position parameter) and for failure
let map, mapEvent;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position);
      const { latitude } = position.coords;
      const { longitude } = position.coords;

      //   console.log(`https://www.google.pl/maps/@${latitude},${longitude}`); /// google map link has latitude and longitude in it, so we use our variables to create that link with template literal

      const coords = [latitude, longitude];

      map = L.map('map').setView(coords, 13);

      // console.log(map);

      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
      ).addTo(map);

      /// Handling clicks on map
      map.on('click', function (mapE) {
        //global variable mapEvent is declared as mapE of this event so it can be used later
        mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
      });
      // on() is coming from leaflet library
      // map.on();
    },
    function () {
      alert('Could not get your position');
    }
  );
}

form.addEventListener('submit', function (e) {
  /// Clear input fields
  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      '';

  // Display the marker
  e.preventDefault();
  console.log(mapEvent);
  /// mapEvent is declared as global variable
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('Workout')
    .openPopup();
});

////
// console.log(firstName);
inputType.addEventListener('change', function (e) {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
