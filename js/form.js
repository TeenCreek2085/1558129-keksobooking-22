import {LOCATION_PRECISION} from './apartments.js';

const mapFilters = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');
const addressField = adForm.querySelector('#address');
const typeField = adForm.querySelector('#type');
const priceField = adForm.querySelector('#price');
const checkIn = adForm.querySelector('#timein');
const checkOut = adForm.querySelector('#timeout');

const MIN_PRICES = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
}

// Логика обработки пользовательского ввода для полей
const onTypeChange = () => {
  const type = typeField.value;
  const minPrice = MIN_PRICES[type];
  priceField.placeholder = minPrice;
  priceField.min = minPrice;
}

const onCheckInChange = () => {
  checkOut.value = checkIn.value;
}

const onCheckOutChange = () => {
  checkIn.value = checkOut.value;
}

typeField.addEventListener('change', onTypeChange);

checkIn.addEventListener('change', onCheckInChange);

checkOut.addEventListener('change', onCheckOutChange);

// Сценарий переключения режимов карты между неактивным и активным
const deactivateMapForm = () => {
  adForm.classList.add('ad-form--disabled');
  adForm.querySelectorAll('fieldset').forEach((fieldset) => {
    fieldset.classList.add('disabled');
  });

  mapFilters.classList.add('map__filters--disabled');
  mapFilters.querySelectorAll('.map__filter').forEach((filter) => {
    filter.classList.add('disabled');
  })

  mapFilters.querySelectorAll('.map__features').forEach((feature) => {
    feature.classList.add('disabled');
  })
}

const fillAddress = ({lat, long}) => {
  const latitude = lat.toFixed(LOCATION_PRECISION);
  const longitude = long.toFixed(LOCATION_PRECISION);
  addressField.value = `${latitude} ${longitude}`;
}

const activateMapForm = (startingAddress) => {
  return () => {
    adForm.classList.remove('ad-form--disabled');

    adForm.querySelectorAll('fieldset').forEach((fieldset) => {
      fieldset.classList.remove('disabled');
    });

    mapFilters.classList.remove('map__filters--disabled');
    mapFilters.querySelectorAll('.map__filter').forEach((filter) => {
      filter.classList.remove('disabled');
    });

    mapFilters.querySelectorAll('.map__features').forEach((feature) => {
      feature.classList.remove('disabled');
    });

    addressField.setAttribute('readonly', 'readonly');

    fillAddress(startingAddress);
  }
}

export {deactivateMapForm, activateMapForm, fillAddress};
