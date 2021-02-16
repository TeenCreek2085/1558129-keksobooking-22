import {similarApartments} from './data.js';

// Функиця, создающая элементы
const makeElement = (className, tagName, source) => {
  const element = document.createElement(tagName);
  element.classList.add(...className);

  if (source) {
    element.src = source;
  }
  return element;
};

// // Проверка на содержимое
// const safeRender = (el, value) => {
//   if (value.nodeType != Node.TEXT_NODE) {
//     el.textContent = value;
//   } else {
//     el.classList.add('hidden');
//   }
// };

// Создание блока с ценой
const createPriceElement = (card, offer) => {
  const priceElement = card.querySelector('.popup__text--price');
  const text = `${offer.price} ₽/ночь`;
  offer.price ? priceElement.textContent = text : priceElement.classList.add('hidden');
};

// Блок с типом апартаментов
const apartmentsType = {
  'flat':  'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
};

// Создание блока с количеством комнат
const createCapacityElement = (card, offer) => {
  const capacityElement = card.querySelector('.popup__text--capacity');
  const text = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  (offer.rooms && offer.guests) ? capacityElement.textContent = text : capacityElement.classList.add('hidden');
};

// Создание блока с временем заезда/выезда
const createTimeElement = (card, offer) => {
  const timeElement = card.querySelector('.popup__text--time');
  const text = `Заезд после ${offer.checkin} выезд до ${offer.checkout}`;
  (offer.checkin && offer.checkout) ? timeElement.textContent = text : timeElement.classList.add('hidden');
};

// Создание блока с преимуществами
const createFeaturesElement = (card, offer) => {
  const features = card.querySelector('.popup__features');
  features.innerHTML = '';

  if (offer.features) {
    offer.features.forEach(element => {
      const featureClasses = ['popup__feature', `popup__feature--${element}`]
      const feature = makeElement(featureClasses, 'li');
      features.appendChild(feature);
    });
  } else {
    features.classList.add('hidden');
  }
};

// Создание блока с фотографиями
const createPhotoElement = (card, offer) => {
  const photos = card.querySelector('.popup__photos');
  const photo = photos.querySelector('.popup__photo');
  photos.removeChild(photo);

  if (offer.photos) {
    for (let i = 0; i < offer.photos.length; i++) {
      photo.src = offer.photos[i];
      photos.appendChild(photo.cloneNode(true));
    }
  } else {
    photos.classList.add('hidden');
  }
};

// Создание остальных блоков
const createCardElement = (card, element, value, className) => {
  const offerElement = card.querySelector(className)
  element ? offerElement[value] = element : offerElement.classList.add('hidden');
};

const apartmentsListFragment = document.createDocumentFragment();

// Создание карточки
const createCard = (apartments) => {
  const cardPopup = document.querySelector('#card')
    .content
    .querySelector('.popup');

  const card = cardPopup.cloneNode(true);
  const offer = apartments.offer;
  const author = apartments.author;

  createCardElement(card, offer.title, 'textContent', '.popup__title');
  createCardElement(card, offer.address, 'textContent', '.popup__text--address');
  createPriceElement(card, offer);
  createCardElement(card, apartmentsType[offer.type], 'textContent', '.popup__type');
  createCapacityElement(card, offer);
  createTimeElement(card, offer);
  createFeaturesElement(card, offer);
  createCardElement(card, offer.description, 'textContent', '.popup__description');
  createPhotoElement(card, offer);
  createCardElement(card, author.avatar, 'src', '.popup__avatar');

  apartmentsListFragment.appendChild(card);
};

const apartmentsItem = similarApartments.slice(0, 1);

apartmentsItem.forEach(offer => createCard(offer));

const mapCanvas = document.querySelector('#map-canvas');
const createSimilarApartment = mapCanvas.appendChild(apartmentsListFragment);

export {createSimilarApartment};
