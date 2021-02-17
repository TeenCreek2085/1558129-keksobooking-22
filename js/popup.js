import {similarApartments} from './data.js';

// Блок с типом апартаментов
const APARTMENTS_TYPE = {
  'flat':  'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
};

// Создание блока с преимуществами
const createFeaturesElement = (featureList, el) => {
  el.innerHTML = '';

  featureList.forEach((feature => {
    const createFeature = document.createElement('li');
    createFeature.classList.add('popup__feature', `popup__feature--${feature}`);
    el.appendChild(createFeature);
  }));
}

const apartmentsListFragment = document.createDocumentFragment();

// Создание блока с фотографиями
const createImageElement = (imagesList, el) => {
  imagesList.forEach((image) => {
    const createImage = el.querySelector('img').cloneNode();
    createImage.src = image;
    apartmentsListFragment.appendChild(createImage);
  });

  el.innerHTML = '';
  el.appendChild(apartmentsListFragment);
}

const mapCanvas = document.querySelector('#map-canvas');
const createCard = similarApartments.slice(0,1);

// Создание карточки
createCard.forEach(({author, offer}) => {
  const cardPopup = document.querySelector('#card')
    .content
    .querySelector('.popup');

  const card = cardPopup.cloneNode(true);

  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = offer.address;
  card.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  card.querySelector('.popup__type').textContent = APARTMENTS_TYPE[offer.type];
  card.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin} выезд до ${offer.checkout}`;
  createFeaturesElement(offer.features, card.querySelector('.popup__features'));
  card.querySelector('.popup__description').textContent = offer.description;
  createImageElement(offer.photos, card.querySelector('.popup__photos'));
  card.querySelector('.popup__avatar').src = author.avatar;

  apartmentsListFragment.appendChild(card);
})

const createSimilarApartment = mapCanvas.appendChild(apartmentsListFragment);

export {createSimilarApartment};
