'use strict'

const APARTMENTS_COUNT = 10;
const APARTMENTS_TYPES = ['bungalow', 'flat', 'house', 'palace'];
const APARTMENTS_CHECK_IN = ['12:00', '13:00', '14:00'];
const APARTMENTS_CHECK_OUT = ['12:00', '13:00', '14:00'];
const APARTMENTS_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const APARTMENTS_IMAGES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg]'];
const APARTMENTS_DESCRITIONS = ['Замечательное место для приема гостей и релакса', 'Изысканный уют', 'Великолепные апартаменты в центре', 'Подходит как туристам, так и бизнесменам', 'Апартаменты полностью укомплектованы и недавно отремонтированы', 'Разрешено заселяться с домашними питомцами', 'Двуспальная кровать', 'Выход окон на парк', 'Компактность, практичность и экономия', 'Квартира с стеклянной лестницей'];
const APARTMENTS_TITLE = ['Живите красиво уже сегодня','Бесконечная элегантность' , 'Роскошь, достойная султана', 'Дом под старину', 'Для взыскательных хозяев', 'Каждый уголок квартиры освещен светом добра и любви', 'Милая, уютная квартирка в центре города', 'Уютное гнездышко для молодоженов', 'Комфортная студия', 'Роскошный пентхаус', 'Апартаменты, в котором проживала знаменитость'];

// Функция, проверяющее условие для диапазона
const isRangeValid = (min, max) => min >= 0 && max >= 0 && max > min;

// Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomInteger = (min, max) => {
  if (!isRangeValid(min, max)) {
    return null;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
const getRandomFloat = (min, max, numbersAfterPoint = 1) => {
  if (!isRangeValid(min, max)) {
    return null;
  }
  const result = Math.random() * (max - min) + min;
  return result.toFixed(numbersAfterPoint);
};

// Функция, добавляющая ведущий 0
const getZeroFirst = (number) => {
  return number < 10 ? `0${number}` : number;
}

// Функция, находящая случайный индекс из массива
const getRandomIndex = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
}

// Функция, добавляющая элемент в массив
const getFillArray = (array, values) => {
  const newArray = [];
  for (let i = 0; i < values; i++) {
    newArray.push(array[i]);
  }
  return newArray;
}

// Функция, перемешивающая элементы в массиве методом Фишера — Йетса
const getShuffleArray = (array) => {
  const shuffleArray = array.slice();
  for (let i = shuffleArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffleArray[i], shuffleArray[j]] = [shuffleArray[j], shuffleArray[i]];
  }
  return shuffleArray;
};

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

// Функция, создающая новый массив с объявлениями
const similarApartments = new Array(APARTMENTS_COUNT).fill(null).map(() => createApartments());
similarApartments;
