import {getZeroFirst, getRandomIndex, getFillArray, getShuffleArray} from './utils.js';
import {getRandomInteger, getRandomFloat} from './math.js';

const APARTMENTS_TYPES = ['bungalow', 'flat', 'house', 'palace'];
const APARTMENTS_CHECK_IN = ['12:00', '13:00', '14:00'];
const APARTMENTS_CHECK_OUT = ['12:00', '13:00', '14:00'];
const APARTMENTS_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const APARTMENTS_IMAGES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const APARTMENTS_DESCRITIONS = ['Замечательное место для приема гостей и релакса', 'Изысканный уют', 'Великолепные апартаменты в центре', 'Подходит как туристам, так и бизнесменам', 'Апартаменты полностью укомплектованы и недавно отремонтированы', 'Разрешено заселяться с домашними питомцами', 'Двуспальная кровать', 'Выход окон на парк', 'Компактность, практичность и экономия', 'Квартира с стеклянной лестницей'];
const APARTMENTS_TITLE = ['Живите красиво уже сегодня','Бесконечная элегантность' , 'Роскошь, достойная султана', 'Дом под старину', 'Для взыскательных хозяев', 'Каждый уголок квартиры освещен светом добра и любви', 'Милая, уютная квартирка в центре города', 'Уютное гнездышко для молодоженов', 'Комфортная студия', 'Роскошный пентхаус', 'Апартаменты, в котором проживала знаменитость'];
const MIN_PRICE = 2000;
const MAX_PRICE = 15000;
const MIN_AVATAR_NUMBER = 1;
const MAX_AVATAR_NUMBER = 8;
const MIN_ROOMS_NUMBER = 1;
const MAX_ROOMS_NUMBER = 4;
const MIN_GUESTS_NUMBER = 1;
const MAX_GUESTS_NUMBER = 4;
const LOCATION_PRECISION = 5;
const MIN_LATITUDE = 35.65000;
const MAX_LATITUDE = 35.70000;
const MIN_LONGITUDE = 139.70000;
const MAX_LONGITUDE = 139.80000;

// Функция, генерирующая объявление
const createApartments = () => {
  return {
    author: {
      avatar: `img/avatars/user${getZeroFirst(getRandomInteger(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER))}.png`,
    },
    offer: {
      title: getRandomIndex(APARTMENTS_TITLE),
      address: `${getRandomFloat(1, 100, 3)}, ${getRandomFloat(1, 100, 3)}`,
      price: getRandomInteger(MIN_PRICE, MAX_PRICE),
      type: getRandomIndex(APARTMENTS_TYPES),
      rooms: getRandomInteger(MIN_ROOMS_NUMBER, MAX_ROOMS_NUMBER),
      guests: getRandomInteger(MIN_GUESTS_NUMBER, MAX_GUESTS_NUMBER),
      checkin: getRandomIndex(APARTMENTS_CHECK_IN),
      checkout: getRandomIndex(APARTMENTS_CHECK_OUT),
      features: getFillArray(getShuffleArray(APARTMENTS_FEATURES), getRandomInteger(1, APARTMENTS_FEATURES.length)),
      description: getRandomIndex(APARTMENTS_DESCRITIONS),
      photos: getFillArray(getShuffleArray(APARTMENTS_IMAGES), getRandomInteger(1, APARTMENTS_IMAGES.length)),
    },
    location: {
      x: getRandomFloat(MIN_LATITUDE, MAX_LATITUDE, LOCATION_PRECISION),
      y: getRandomFloat(MIN_LONGITUDE, MAX_LONGITUDE, LOCATION_PRECISION),
    },
  };
};

export {createApartments, LOCATION_PRECISION};

