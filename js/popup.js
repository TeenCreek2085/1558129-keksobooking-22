import {similarApartments} from './data.js'

const mapCanvas = document.querySelector('#map-canvas');
const cardPopup = document.querySelector('#card')
  .content
  .querySelector('.popup');

const apartmentsItem = similarApartments.slice(0, 1);
const apartmentsListFragment = document.createDocumentFragment();

// Проверка на пустое поле
const safeRender = (el, value) => {
  if (!value) {
    el.style.display = 'none';
  }
}

// Генерация разметки похожих элементов
apartmentsItem.forEach((apartments) => {
  const offer = apartments.offer;
  const cardElement = cardPopup.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = offer.title;
  safeRender(cardElement.querySelector('.popup__title'), offer.title);

  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  safeRender(cardElement.querySelector('.popup__text--address'), offer.address);

  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  safeRender(cardElement.querySelector('.popup__text--price'), `${offer.price} ₽/ночь`);

  const offerType = offer.type;
  let popupType;
  switch (offerType) {
    case 'flat':
      popupType = 'Квартира';
      break;
    case 'bungalow':
      popupType = 'Бунгало';
      break;
    case 'house':
      popupType = 'Дом';
      break;
    case 'palace':
      popupType = 'Дворец';
      break;
  }

  cardElement.querySelector('.popup__type').textContent = popupType;
  safeRender(cardElement.querySelector('.popup__type'), popupType);

  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  safeRender(cardElement.querySelector('.popup__text--capacity'), `${offer.rooms} комнаты для ${offer.guests} гостей`);

  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  safeRender(cardElement.querySelector('.popup__text--time'), `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);

  const featuresList = cardElement.querySelector('.popup__features');
  featuresList.innerHTML = '';
  for (let i = 0; i < offer.features.length; i++) {
    const featuresElement = document.createElement('li');
    featuresElement.classList.add('popup__feature');
    switch (offer.features[i]) {
      case 'wifi':
        featuresElement.classList.add('popup__feature--wifi');
        break;
      case 'dishwasher':
        featuresElement.classList.add('popup__feature--dishwasher');
        break;
      case 'parking':
        featuresElement.classList.add('popup__feature--parking');
        break;
      case 'washer':
        featuresElement.classList.add('popup__feature--washer');
        break;
      case 'elevator':
        featuresElement.classList.add('popup__feature--elevator');
        break;
      case 'conditioner':
        featuresElement.classList.add('popup__feature--conditioner');
        break;
    }
    featuresElement.textContent = offer.features[i];
    featuresList.appendChild(featuresElement);
    safeRender(featuresList, offer.features[i])
  }

  cardElement.querySelector('.popup__description').textContent = offer.description;
  safeRender(cardElement.querySelector('.popup__description'), offer.description);

  const popupPhotos = cardElement.querySelector('.popup__photos');
  const popupPhoto = cardElement.querySelector('.popup__photo');
  popupPhotos.innerHTML = '';

  for (let i = 0; i < offer.photos.length; i++) {
    popupPhoto.src = offer.photos[i];
    popupPhotos.appendChild(popupPhoto.cloneNode(true))
    safeRender(cardElement.querySelector('.popup__photos'), offer.photos[i]);
  }

  cardElement.querySelector('.popup__avatar').src = apartments.author.avatar;
  safeRender(cardElement.querySelector('.popup__avatar'), apartments.author.avatar);

  apartmentsListFragment.appendChild(cardElement);
});

const createSimilarApartment = mapCanvas.appendChild(apartmentsListFragment);

export {createSimilarApartment};

