import {showAlert} from './utils.js';

const ERROR_MESSAGE = 'При загрузке данных с сервера произошла ошибка. Попробуйте ещё раз';

// Получение данных с сервера
const getData = (onSuccess) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        showAlert(ERROR_MESSAGE);
      }
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      showAlert(ERROR_MESSAGE);
    });
}

// Отправка данных на сервер
const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
