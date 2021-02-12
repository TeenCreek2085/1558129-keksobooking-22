import {getZeroFirst, getRandomIndex, getFillArray, getShuffleArray} from './utils.js';
import {getRandomInteger, getRandomFloat} from './math.js';

const APARTMENTS_TYPES = ['bungalow', 'flat', 'house', 'palace'];
const APARTMENTS_CHECK_IN = ['12:00', '13:00', '14:00'];
const APARTMENTS_CHECK_OUT = ['12:00', '13:00', '14:00'];
const APARTMENTS_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const APARTMENTS_IMAGES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg]'];
const APARTMENTS_DESCRITIONS = ['Замечательное место для приема гостей и релакса', 'Изысканный уют', 'Великолепные апартаменты в центре', 'Подходит как туристам, так и бизнесменам', 'Апартаменты полностью укомплектованы и недавно отремонтированы', 'Разрешено заселяться с домашними питомцами', 'Двуспальная кровать', 'Выход окон на парк', 'Компактность, практичность и экономия', 'Квартира с стеклянной лестницей'];
const APARTMENTS_TITLE = ['Живите красиво уже сегодня','Бесконечная элегантность' , 'Роскошь, достойная султана', 'Дом под старину', 'Для взыскательных хозяев', 'Каждый уголок квартиры освещен светом добра и любви', 'Милая, уютная квартирка в центре города', 'Уютное гнездышко для молодоженов', 'Комфортная студия', 'Роскошный пентхаус', 'Апартаменты, в котором проживала знаменитость'];

// Функция, генерирующая объявление
const createApartments = () => {
  return {
    author: {
      avatar: `img/avatars/user${getZeroFirst(getRandomInteger(0, 8))}.png`,
    },
    offer: {
      title: getRandomIndex(APARTMENTS_TITLE),
      address: `${getRandomFloat(1, 100)}, ${getRandomFloat(1, 100)}`,
      price: getRandomInteger(100, 10000),
      type: getRandomIndex(APARTMENTS_TYPES),
      rooms: getRandomInteger(1, 4),
      guests: getRandomInteger(1, 4),
      checkin: getRandomIndex(APARTMENTS_CHECK_IN),
      checkout: getRandomIndex(APARTMENTS_CHECK_OUT),
      features: getFillArray(getShuffleArray(APARTMENTS_FEATURES), getRandomInteger(1, APARTMENTS_FEATURES.length)),
      description: getRandomIndex(APARTMENTS_DESCRITIONS),
      photos: getFillArray(getShuffleArray(APARTMENTS_IMAGES), getRandomInteger(1, APARTMENTS_IMAGES.length)),
    },
    location: {
      x: getRandomFloat(35.65000, 35.70000, 2),
      y: getRandomFloat(139.70000, 139.80000, 2),
    },
  };
};

export {createApartments};

