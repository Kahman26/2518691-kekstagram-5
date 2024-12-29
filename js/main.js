import { getData } from './api.js';
import { renderThumbnails } from './thumbnails.js';
import { initForm } from './form.js';

const photos = [];

getData()
  .then((data) => {
    photos.push(...data); // Загружаем данные в массив
    renderThumbnails(photos); // Отрисовываем миниатюры
  })
  .catch((error) => {
    console.error('Ошибка загрузки данных:', error);
    // Показать сообщение об ошибке пользователю
    const errorBlock = document.createElement('div');
    errorBlock.textContent = 'Не удалось загрузить фотографии. Попробуйте позже.';
    errorBlock.style.cssText = `
      color: red;
      text-align: center;
      font-size: 20px;
      margin-top: 20px;
    `;
    document.body.appendChild(errorBlock);
  });

initForm(photos, renderThumbnails);
