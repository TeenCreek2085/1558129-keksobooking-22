import {getRandomInteger} from './math.js';

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

export {getZeroFirst, getRandomIndex, getFillArray, getShuffleArray};
