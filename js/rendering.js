import { generatePhotos } from './main.js';

const PICTURES_TITLE = document.querySelector('.pictures__title');
PICTURES_TITLE.classList.remove('visually-hidden');

const PICTURE_ELEMENT = document.querySelector ('.pictures');
const PICTURE_TEMPLATE = document.querySelector ('#picture')
	.content
	.querySelector('.picture');

const RANDOM_PICTURES = generatePhotos;
const PICTURES_FRAGMENT = document.createDocumentFragment();

RANDOM_PICTURES.forEach(({url, description, likes, comments}) => {
	const PICTURE = PICTURE_TEMPLATE.cloneNode(true);
	PICTURE.querySelector('.picture__img').src = url;
	PICTURE.querySelector('.picture__img').alt = description;
	PICTURE.querySelector('.picture__likes').textContent = likes;
	PICTURE.querySelector('.picture__comments').textContent = comments;
	PICTURES_FRAGMENT.appendChild(PICTURE);
});

PICTURE_ELEMENT.appendChild(PICTURES_FRAGMENT);

