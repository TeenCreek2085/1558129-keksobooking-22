import {createAdvertisementCards} from './map.js';
import {getData} from './api.js';
import {setFilterChange} from './filter.js';

getData((data) => {
  createAdvertisementCards(data);
  setFilterChange((
    () => createAdvertisementCards(data)
  ));
});
