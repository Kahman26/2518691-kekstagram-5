const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsContainer = bigPicture.querySelector('.social__comments');
const caption = bigPicture.querySelector('.social__caption');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const body = document.body;


function createComment({ avatar, name, message }) {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  commentElement.innerHTML = `
    <img
      class="social__picture"
      src="${avatar}"
      alt="${name}"
      width="35"
      height="35">
    <p class="social__text">${message}</p>
  `;
  return commentElement;
}


function openBigPicture(photoData) {
  bigPictureImg.src = photoData.url;
  bigPictureImg.alt = photoData.description;
  likesCount.textContent = photoData.likes;
  commentsCount.textContent = photoData.comments.length;
  caption.textContent = photoData.description;

  commentsContainer.innerHTML = '';
  photoData.comments.forEach(comment => {
    const commentElement = createComment(comment);
    commentsContainer.appendChild(commentElement);
  });

  commentCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  closeButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onDocumentKeydown);
}


function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  closeButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onDocumentKeydown);
}


function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

export { openBigPicture };

