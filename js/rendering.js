import { openBigPicture } from './big-picture.js';

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');


function createThumbnail(photoData) {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  const img = thumbnail.querySelector('.picture__img');
  img.src = photoData.url;
  img.alt = photoData.description;

  thumbnail.querySelector('.picture__likes').textContent = photoData.likes;
  thumbnail.querySelector('.picture__comments').textContent = photoData.comments.length;

  thumbnail.addEventListener('click', () => {
    openBigPicture(photoData);
  });

  return thumbnail;
}


function renderThumbnails(data) {
  const fragment = document.createDocumentFragment();
  data.forEach(photoData => {
    const thumbnail = createThumbnail(photoData);
    fragment.appendChild(thumbnail);
  });
  picturesContainer.appendChild(fragment);
}

export { renderThumbnails };



