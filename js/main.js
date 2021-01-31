'use strict'

// Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomInteger = function (min, max) {
  if (min < 0 || max < 0 || max <= min) {
    return null;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomInteger(0, 30);

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
const getRandomFloat = function (min, max, numbersAfterPoint = 1) {
  if (min < 0 || max < 0 || max <= min) {
    return null;
  }
  const result = Math.random() * (max - min) + min;
  return result.toFixed(numbersAfterPoint);
}

getRandomFloat(0.875, 50.3, 2);
