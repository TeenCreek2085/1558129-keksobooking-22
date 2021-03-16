// Блок с типом апартаментов
const APARTMENTS_TYPE = {
  'flat':  'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
};

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
      el.tagName === 'IMG' ? el.src = content : el.textContent = content;
    }
  }
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
const createCard = (item) => {
  const cardPopup = document.querySelector('#card')
    .content
    .querySelector('.popup');

  const card = cardPopup.cloneNode(true);

  renderElement(item.offer.title, card.querySelector('.popup__title'));
  renderElement(item.offer.address, card.querySelector('.popup__text--address'));
  renderElement(`${item.offer.price} ₽/ночь`, card.querySelector('.popup__text--price'));
  renderElement(APARTMENTS_TYPE[item.offer.type], card.querySelector('.popup__type'));
  renderElement(`${item.offer.rooms} комнаты для ${item.offer.guests} гостей`, card.querySelector('.popup__text--capacity'));
  renderElement(`Заезд после ${item.offer.checkin} выезд до ${item.offer.checkout}`, card.querySelector('.popup__text--time'));
  createFeaturesElement(item.offer.features, card.querySelector('.popup__features'));
  renderElement(item.offer.description, card.querySelector('.popup__description'));
  createImageElement(item.offer.photos, card.querySelector('.popup__photos'));
  renderElement(item.author.avatar, card.querySelector('.popup__avatar'));

  return card;
}

export {createCard};
