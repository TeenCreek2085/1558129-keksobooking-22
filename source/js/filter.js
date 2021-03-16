const PRICES = {
  'low': 10000,
  'high': 50000,
}

const ANY_VALUE = 'any';

const mapFilter = document.querySelector('.map__filters');
const typeFilter = mapFilter.querySelector('#housing-type');
const priceFilter = mapFilter.querySelector('#housing-price');
const roomsFilter = mapFilter.querySelector('#housing-rooms');
const guestsFilter = mapFilter.querySelector('#housing-guests');
const featuresFilter = mapFilter.querySelector('#housing-features');

// Фильтрация по цене
const getPriceFilter = (data) => {
  switch (priceFilter.value) {
    case 'low':
      return data.offer.price < PRICES[priceFilter.value];
    case 'middle':
      return (data.offer.price >= PRICES['low']) && (data.offer.price <= PRICES['high']);
    case 'high':
      return data.offer.price > PRICES[priceFilter.value];
    default:
      return true;
  }
};

// Фильтрация по преимуществам
const getFeaturesFilter = (data) => {
  const isCheckedFeatures = featuresFilter.querySelectorAll('input:checked');

  return Array.from(isCheckedFeatures).every((input) => {
    return data.offer.features.includes(input.value);
  });
};

// Фильтрация по остальным параметрам
const getOtherFilters = (element, content) => {
  if (typeof content === 'string') {
    return element.value === ANY_VALUE || element.value === content;
  }
  return element.value === ANY_VALUE || +element.value === content;
}

// Инициализация параметров
const getFilter = (data) => {
  const type = getOtherFilters(typeFilter, data.offer.type);
  const price = getPriceFilter(data);
  const rooms = getOtherFilters(roomsFilter, data.offer.rooms);
  const guests = getOtherFilters(guestsFilter, data.offer.guests);
  const features = getFeaturesFilter(data);

  return type && price && rooms && guests && features;
};

// Вывод необходимого количества карточек
const filterAdverts = (data) => {
  return data.slice().filter(getFilter);
}

// Активация фильтров
const setFilterChange = (cb) => {
  mapFilter.addEventListener('change', cb);
}

export {setFilterChange, filterAdverts};
