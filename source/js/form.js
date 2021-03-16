import {STARTING_LATITUDE, STARTING_LONGITUDE, mainPinMarker} from './map.js';
import {isEscEvent} from './utils.js';
import {sendData} from './api.js';
import {cleanPhotos} from './avatar.js';

const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const MAX_PRICE_PER_NIGHT = 1000000;
const MAX_ROOM_NUMBERS = 100;
const LOCATION_PRECISION = 5;

const MIN_PRICES = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
}

const mapFilters = document.querySelector('.map__filters');
const main = document.querySelector('main');
const adForm = document.querySelector('.ad-form');
const addressField = adForm.querySelector('#address');
const typeField = adForm.querySelector('#type');
const priceField = adForm.querySelector('#price');
const checkIn = adForm.querySelector('#timein');
const checkOut = adForm.querySelector('#timeout');
const formTitle = adForm.querySelector('#title');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const resetButton = adForm.querySelector('.ad-form__reset');
const errorMessage = document.querySelector('#error')
  .content
  .querySelector('.error');
const successMessage = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorButton = errorMessage.querySelector('.error__button');

// Логика обработки пользовательского ввода для полей
const onCheckInChange = () => {
  checkOut.value = checkIn.value;
}

const onCheckOutChange = () => {
  checkIn.value = checkOut.value;
}

const onTypeChange = () => {
  priceField.placeholder = MIN_PRICES[typeField.value];
  priceField.min = MIN_PRICES[typeField.value];
}

checkIn.addEventListener('change', onCheckInChange);

checkOut.addEventListener('change', onCheckOutChange);

typeField.addEventListener('change', onTypeChange);

// Валидация заголовка
const onCheckFormTitle = () => {
  const valueTrim = formTitle.value.trim();
  const valueLength = valueTrim.length;

  if (valueLength < MIN_NAME_LENGTH) {
    formTitle.setCustomValidity(`Ещё ${MIN_NAME_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    formTitle.setCustomValidity(`Удалите лишние ${valueLength - MAX_NAME_LENGTH} симв.`);
  } else {
    formTitle.setCustomValidity('');
  }

  formTitle.reportValidity();
}

formTitle.addEventListener('input', onCheckFormTitle);

// Валидация цены
const onPriceInput = () => {
  const type = typeField.value;
  const price = priceField.value;
  const minPrice = MIN_PRICES[type];

  if (price < minPrice) {
    priceField.setCustomValidity(`Стоимость должна быть не менее ${minPrice}`);
  } else if (price > MAX_PRICE_PER_NIGHT) {
    priceField.setCustomValidity(`Стоимость не должна превышать ${MAX_PRICE_PER_NIGHT}`);
  } else {
    priceField.setCustomValidity('');
  }
}

priceField.addEventListener('input', onPriceInput);

// Валидация комнат и гостей
const onCheckNumberRooms = () => {
  const roomsValue = +roomNumber.value;
  const guestsValue = +capacity.value;

  if (roomsValue < guestsValue) {
    capacity.setCustomValidity('Слишком много мест для гостей');
  } else if (roomsValue !== MAX_ROOM_NUMBERS && guestsValue === 0) {
    capacity.setCustomValidity('Необходимо выбрать количество мест для гостей');
  } else if (roomsValue === MAX_ROOM_NUMBERS && guestsValue !== 0) {
    capacity.setCustomValidity('Данный вариант не для гостей');
  } else {
    capacity.setCustomValidity('');
  }
};

capacity.addEventListener('change', onCheckNumberRooms);

roomNumber.addEventListener('change', onCheckNumberRooms);

// Инициализация проверки
const activateForm = () => {
  onCheckNumberRooms();
  onTypeChange();
  onCheckInChange();
  onCheckOutChange();
}

// Сделать фильтры неактивными
const assignInactiveStatus = () => {
  mapFilters.classList.add('map__filters--disabled');
  mapFilters.querySelectorAll('.map__filter').forEach((filter) => {
    filter.setAttribute('disabled', 'disabled');
  })

  mapFilters.querySelectorAll('.map__features').forEach((feature) => {
    feature.setAttribute('disabled', 'disabled');
  })
}

// Сделать фильтры активными
const assignActiveStatus = () => {
  mapFilters.classList.remove('map__filters--disabled');
  mapFilters.querySelectorAll('.map__filter').forEach((filter) => {
    filter.removeAttribute('disabled');
  });

  mapFilters.querySelectorAll('.map__features').forEach((feature) => {
    feature.removeAttribute('disabled');
  });
}

// Сценарий переключения режимов карты между неактивным и активным
const deactivateMapForm = () => {
  adForm.classList.add('ad-form--disabled');
  adForm.querySelectorAll('fieldset').forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'disabled');
  });

  assignInactiveStatus();
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
      fieldset.removeAttribute('disabled');
    });

    assignActiveStatus();

    addressField.setAttribute('readonly', 'readonly');

    fillAddress(startingAddress);

    activateForm();
  }
}

// Сброс введенных данных
const onResetForm = () => {
  const resetPins = new Event('change');
  adForm.reset();
  mapFilters.reset();
  cleanPhotos();
  mapFilters.dispatchEvent(resetPins);
  mainPinMarker.setLatLng({lat: STARTING_LATITUDE, lng: STARTING_LONGITUDE});
  setTimeout(() => {
    fillAddress({lat: STARTING_LATITUDE, long: STARTING_LONGITUDE});
  }, 0);
};

resetButton.addEventListener('click', onResetForm);

// Обработчик для закрытия окна при нажатии ESC
const onCloseKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    setPopupClose();
  }
}

// Удаление/Добавление обработчика
const setPopupClose = () => {
  if (main.contains(successMessage)) {
    successMessage.remove();
  }

  if (main.contains(errorMessage)) {
    errorMessage.remove();
  }

  document.removeEventListener('keydown', onCloseKeydown);
};

const setPopupSuccessOpen = () => {
  main.append(successMessage);
  document.addEventListener('keydown', onCloseKeydown);
};

const setPopupErrorOpen = () => {
  main.append(errorMessage);
  document.addEventListener('keydown', onCloseKeydown);
};

// Показ сообщения при отправке
const getSuccessMessage = () => {
  successMessage.style.zIndex = 1000;
  onResetForm();
  setPopupSuccessOpen();
}

const getErrorMessage = () => {
  errorMessage.style.zIndex = 1000;
  setPopupErrorOpen();
}

// Добавление обработчика при клике
document.addEventListener('click', setPopupClose);

errorButton.addEventListener('click', setPopupClose);

// Отправка формы
const setFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(getSuccessMessage, getErrorMessage, new FormData(evt.target));
  });
};

setFormSubmit();

export {deactivateMapForm, activateMapForm, fillAddress};
