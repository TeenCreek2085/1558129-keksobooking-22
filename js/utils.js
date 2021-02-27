import {getRandomInteger} from './math.js';

const ALERT_SHOW_TIME = 5000;

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

// Обработка возможных ошибок при загрузке
const showAlert = (message) => {
  const alertContainer = document.createElement('div');

  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'tomato';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

// Для обработчика событий
const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const isMouseEvent = (evt) => {
  return evt.type === 'click';
};

export {getZeroFirst, getRandomIndex, getFillArray, getShuffleArray, showAlert, isEscEvent, isMouseEvent};
