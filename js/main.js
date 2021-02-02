'use strict'

//Функция, проверяющее условие для диапазона
const isRangeValid = (min, max) => min >= 0 && max >= 0 && !(min >= max);

//Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomInteger = (min, max) => {
  if(!isRangeValid(min, max)) {
    return null;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomInteger(0.11, 50);

//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
const getRandomFloat = (min, max, numbersAfterPoint = 1) => {
  if(!isRangeValid(min, max)) {
    return null;
  }
  const result = Math.random() * (max - min) + min;
  return result.toFixed(numbersAfterPoint);
}

getRandomFloat(0.875, 50.3, 2);
