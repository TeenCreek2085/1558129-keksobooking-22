// import {similarApartments} from './data.js';

// Проверка на наличие содержимого
const renderElement = (content, el) => {
  if (!content) {
    el.style.display = 'none';
    return;
  }

  switch (content.nodeType) {
    case Node.TEXT_NODE: {
      el.textContent = content;
      break;
    }
    case Node.DOCUMENT_FRAGMENT_NODE:
    case Node.ELEMENT_NODE: {
      el.appendChild(content);
      break;
    }
    default: {
      if (el.tagName === 'IMG') {
        el.src = content;
      } else {
        el.textContent = content;
      }
    }
  }
};

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

  if (featureList.length === 0) {
    el.style.display = 'none';
  }
}

const cardFragment = document.createDocumentFragment();

// Создание блока с фотографиями
const createImageElement = (imagesList, el) => {
  imagesList.forEach((image) => {
    const createImage = el.querySelector('img').cloneNode();
    createImage.src = image;
    cardFragment.appendChild(createImage);
  });

  el.innerHTML = '';
  el.appendChild(cardFragment);

  if (imagesList.length === 0) {
    el.style.display = 'none';
  }
}

// Создание карточки
const createCard = ({author, offer}) => {
  const cardPopup = document.querySelector('#card')
    .content
    .querySelector('.popup');

  const card = cardPopup.cloneNode(true);

  renderElement(offer.title, card.querySelector('.popup__title'));
  renderElement(offer.address, card.querySelector('.popup__text--address'));
  renderElement(`${offer.price} ₽/ночь`, card.querySelector('.popup__text--price'));
  renderElement(APARTMENTS_TYPE[offer.type], card.querySelector('.popup__type'));
  renderElement(`${offer.rooms} комнаты для ${offer.guests} гостей`, card.querySelector('.popup__text--capacity'));
  renderElement(`Заезд после ${offer.checkin} выезд до ${offer.checkout}`, card.querySelector('.popup__text--time'));
  createFeaturesElement(offer.features, card.querySelector('.popup__features'));
  renderElement(offer.description, card.querySelector('.popup__description'));
  createImageElement(offer.photos, card.querySelector('.popup__photos'));
  renderElement(author.avatar, card.querySelector('.popup__avatar'));

  return card;
}

// // Создание карточек
// const createSimilarCard = () => {
//   const cards = similarApartments();
//   const mapCanvas = document.querySelector('#map-canvas');

//   cards.forEach((card) => {
//     cardFragment.appendChild(createCard(card));
//   });

//   mapCanvas.appendChild(cardFragment);
// }

export {createCard};
