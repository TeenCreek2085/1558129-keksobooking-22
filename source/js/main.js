/* global _:readonly */
import {createAdvertisementCards} from './map.js';
import {getData} from './api.js';
import {setFilterChange} from './filter.js';

const RERENDER_DELAY = 500;

getData((data) => {
  createAdvertisementCards(data);
  setFilterChange(_.debounce(
    () => createAdvertisementCards(data),
    RERENDER_DELAY,
  ));
});
