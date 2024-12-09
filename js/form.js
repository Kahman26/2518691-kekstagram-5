export function initForm(photos, renderThumbnails) {
  const uploadForm = document.querySelector('.img-upload__form');
  if (!uploadForm) {
    console.error('Форма загрузки не найдена');
    return;
  }

  const fileInput = uploadForm.querySelector('.img-upload__input');
  const uploadOverlay = document.querySelector('.img-upload__overlay');
  const previewImage = uploadOverlay.querySelector('.img-upload__preview img');
  const closeButton = uploadOverlay.querySelector('.img-upload__cancel');

  const effectRadios = document.querySelectorAll('input[name="effect"]');
  const effectLevelSlider = document.querySelector('.effect-level__slider');
  const effectLevelValue = document.querySelector('.effect-level__value');

  let currentEffect = 'none';


  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 0,
    step: 1,
    connect: 'lower',
  });

  // Применение эффекта к изображению

  function applyEffect(effect, value) {
    const imageElement = document.querySelector('.img-upload__preview img');
    imageElement.className = ''; // Сбрасываем предыдущий класс эффекта
    previewImage.style.filter = ''; // Сбрасываем фильтр

    if (effect !== 'none') {
      imageElement.classList.add(`effects__preview--${effect}`);
      const filterValue = value / 100; // Пример нормализации значения слайдера
      switch (effect) {
        case 'chrome':
          previewImage.style.filter = `grayscale(${filterValue})`;
          break;
        case 'sepia':
          previewImage.style.filter = `sepia(${filterValue})`;
          break;
        case 'marvin':
          previewImage.style.filter = `invert(${filterValue * 100}%)`;
          break;
        case 'phobos':
          previewImage.style.filter = `blur(${filterValue * 3}px)`;
          break;
        case 'heat':
          previewImage.style.filter = `brightness(${1 + filterValue * 2})`;
          break;
      }
    }
  }

  // Обновление слайдера при переключении фильтра
  function updateSlider(effect) {
    if (effect === 'none') {
      effectLevelSlider.classList.add('hidden');
      effectLevelValue.value = '';
      previewImage.style.filter = '';
    } else {
      effectLevelSlider.classList.remove('hidden');
      effectLevelSlider.noUiSlider.updateOptions({
        range: { min: 0, max: 100 },
        start: 0, // Сброс значения слайдера в 0
      });
      effectLevelValue.value = 0; // Устанавливаем начальное значение
    }
  }


  // Обработчик переключения фильтров
  effectRadios.forEach((radio) => {
    radio.addEventListener('change', (evt) => {
      currentEffect = evt.target.value;
      updateSlider(currentEffect); // Сбрасываем слайдер в 0 при смене эффекта
      applyEffect(currentEffect, effectLevelSlider.noUiSlider.get());
    });
  });


  // Обновление эффекта при движении слайдера
  effectLevelSlider.noUiSlider.on('update', (values) => {
    const value = Math.round(values[0]);
    effectLevelValue.value = value; // Записываем значение в скрытое поле
    applyEffect(currentEffect, value); // Применяем эффект
  });


  function resetForm() {
    uploadForm.reset();
    uploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    fileInput.value = '';
    previewImage.src = '';
  }

  pristine.addValidator(
    descriptionInput,
    (value) => value.length <= 140,
    'Комментарий не должен превышать 140 символов.'
  );


  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      previewImage.src = imageUrl;
      uploadOverlay.classList.remove('hidden');
      document.body.classList.add('modal-open');

      previewImage.onload = () => {
        URL.revokeObjectURL(imageUrl);
      };
    }
  });

  closeButton.addEventListener('click', resetForm);

  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const newPhoto = {
      id: photos.length + 1,
      url: URL.createObjectURL(fileInput.files[0]),
      description: 'Новое фото',
      likes: 0,
      comments: []
    };

    photos.push(newPhoto);
    renderThumbnails([newPhoto]);

    resetForm();
  });
}
