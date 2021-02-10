import {APARTMENTS_COUNT, createApartments} from './apartments.js';

// Функция, создающая новый массив с объявлениями
const similarApartments = new Array(APARTMENTS_COUNT).fill(null).map(() => createApartments());
similarApartments;
