const ALERT_SHOW_TIME = 5000;

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

export {showAlert, isEscEvent};
