/* global L:readonly */

import {createCard} from './popup.js';
import {deactivateMapForm, activateMapForm, fillAddress} from './form.js';

const STARTING_LATITUDE = 35.683359;
const STARTING_LONGITUDE = 139.749919;
const STARING_ZOOM = 13;
const MAIN_POINTER_SIZE = 45;
const POINTER_SIZE = 40;

deactivateMapForm();

// Инициализация карты
const map = L.map('map-canvas')
  .on('load', activateMapForm({lat: STARTING_LATITUDE, long: STARTING_LONGITUDE}))

  .setView({
    lat: STARTING_LATITUDE,
    lng: STARTING_LONGITUDE,
  }, STARING_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

// Добавление маркера
const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [MAIN_POINTER_SIZE, MAIN_POINTER_SIZE],
  iconAnchor: [MAIN_POINTER_SIZE / 2, MAIN_POINTER_SIZE],
});

const mainPinMarker = L.marker(
  {
    lat: STARTING_LATITUDE,
    lng: STARTING_LONGITUDE,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
).addTo(map);

const onPinMove = (evt) => {
  const address = {
    lat: evt.target.getLatLng().lat,
    long: evt.target.getLatLng().lng,
  }
  fillAddress(address);
}

mainPinMarker.on('move', onPinMove);

// Добавление карточек апартаментов на карту
const createAdvertisementCards = (data) => {
  data.forEach((element) => {
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [POINTER_SIZE, POINTER_SIZE],
      iconAnchor: [POINTER_SIZE / 2, POINTER_SIZE],
    });

    const lat = element.location.lat;
    const lng = element.location.lng;

    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      },
    );

    marker
      .addTo(map)
      .bindPopup(
        createCard(element),
        {
          keepInView: true,
        },
      );
  });
}

export {createAdvertisementCards, mainPinMarker, STARTING_LATITUDE, STARTING_LONGITUDE};

