import {createApartments} from './apartments.js';

const APARTMENTS_COUNT = 10;

// Функция, создающая новый массив с объявлениями
// const similarApartments = new Array(APARTMENTS_COUNT).fill(null).map(() => createApartments());
const similarApartments = () => new Array(APARTMENTS_COUNT).fill(null).map(() => createApartments());

export {similarApartments};
