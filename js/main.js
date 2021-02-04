'use strict'

const APPARTAMENTS_COUNT = 10;
const APPARTAMENTS_TYPES = ['bungalow', 'flat', 'house', 'palace'];
const APPARTAMENTS_CHECK_IN = ['12:00', '13:00', '14:00'];
const APPARTAMENTS_CHECK_OUT = ['12:00', '13:00', '14:00'];
const APPARTAMENTS_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const APPARTAMENTS_IMAGES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg]'];
const APPARTAMENTS_DESCRITIONS = 'Замечательные апартаменты';
const APPARTAMENTS_TITLE = 'Отель в Красноярске';

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
  if (number < 10) {
    return `0${number}`;
  }
  return number;
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

// Функция, генерирующая объявление
const createApartaments = () => {
  return {
    author: {
      avatar: `img/avatars/user${getZeroFirst(getRandomInteger(0, 8))}.png`,
    },
    offer: {
      title: APPARTAMENTS_TITLE,
      address: `${getRandomFloat(1, 100)}, ${getRandomFloat(1, 100)}`,
      price: getRandomInteger(100, 10000),
      type: getRandomIndex(APPARTAMENTS_TYPES),
      rooms: getRandomInteger(1, 4),
      guests: getRandomInteger(1, 4),
      checkin: getRandomIndex(APPARTAMENTS_CHECK_IN),
      checkout: getRandomIndex(APPARTAMENTS_CHECK_OUT),
      features: getFillArray(APPARTAMENTS_FEATURES, getRandomInteger(1, APPARTAMENTS_FEATURES.length)),
      description: APPARTAMENTS_DESCRITIONS,
      photos: getFillArray(APPARTAMENTS_IMAGES, getRandomInteger(1, APPARTAMENTS_IMAGES.length)),
    },
    location: {
      x: getRandomFloat(35.65000, 35.70000),
      y: getRandomFloat(139.70000, 139.80000),
    },
  };
};

// Функция, создающая новый массив с объявлениями
const similarAppartaments = new Array(APPARTAMENTS_COUNT).fill(null).map(() => createApartaments());
similarAppartaments;
