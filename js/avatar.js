const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatarChooser = document.querySelector('.ad-form__field');
const avatarPreview = document.querySelector('.ad-form-header__preview');
const avatarInput = avatarChooser.querySelector('#avatar');
const avatar = avatarPreview.querySelector('img');

const photoContainer = document.querySelector('.ad-form__photo-container');
const photoPreview = photoContainer.querySelector('.ad-form__photo');
const photoInput = photoContainer.querySelector('#images');

// Проверка на окончание имя файла из допустимых расширений
const matches = (name) => {
  return FILE_TYPES.some((it) => {
    return name.endsWith(it);
  });
}

// Загрузка аватарки
const setAvatar = () => {
  avatarInput.addEventListener('change', () => {
    const file = avatarInput.files[0];
    const fileName = file.name.toLowerCase();

    if (matches(fileName)) {
      const reader = new FileReader;

      reader.addEventListener('load', () => {
        avatar.src = reader.result;
      })

      reader.readAsDataURL(file);
    }
  });
}

setAvatar();

// Загрузка фотографии жилья
const setPhoto = () => {
  photoInput.addEventListener('change', () => {
    const file = photoInput.files[0];
    const fileName = file.name.toLowerCase();

    if (matches(fileName)) {
      const reader = new FileReader;
      const newContainer = photoPreview.cloneNode(true);
      const newPhoto = document.createElement('img');

      newPhoto.style.width = '100%';
      newPhoto.style.height = '100%';

      newContainer.appendChild(newPhoto);
      photoContainer.appendChild(newContainer);
      photoPreview.remove();

      reader.addEventListener('load',() => {
        newPhoto.src = reader.result;
      })

      reader.readAsDataURL(file);
    }
  });
}

setPhoto();

const cleanButton = document.querySelector('.ad-form__reset');

// Очистка фотографий
const cleanPhotos = () => {
  const container = document.querySelectorAll('.ad-form__photo');

  container.forEach((item) => {
    item.remove()
  });

  photoContainer.appendChild(photoPreview);
  avatar.src = DEFAULT_AVATAR;
};

cleanButton.addEventListener('click', cleanPhotos);

export {cleanPhotos};

