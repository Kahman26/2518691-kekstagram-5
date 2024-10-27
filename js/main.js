const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Красивая фотка',
  'Закат на пляже',
  'Шикарный вид',
  'Невероятный пейзаж гор',
  'Рассвет в деревне',
  'Все намана, отдыхаем!'
];

const NAMES = [
  'Юра',
  'Володя',
  'Паша',
  'Ваня',
  'Андрей',
  'Маша',
  'Таня',
  'Лена'
];

const DESCRIPTION_COUNT = 25;


const getRandomNumber = (from, to) => {
  let randomNumber = Math.random() * (to - from + 1);
  return Math.floor(randomNumber);
}

const getUniqeId = () => {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const getPhotoId = getUniqeId();
const getUrl = getUniqeId();
const getCommentId = getUniqeId();


const getRandomItem = (dataArray) => dataArray[getRandomNumber(0, dataArray.length - 1)];


const createComments = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: getRandomItem(MESSAGES),
  name: getRandomItem(NAMES)
});


const createDescriptionPhoto = () => ({
  id: getPhotoId(),
  url: `photos/${getUrl()}.jpg`,
  description: getRandomItem(DESCRIPTIONS),
  lekes: getRandomNumber(15, 200),
  comments: Array.from({length: getRandomNumber(0, 30)}, createComments)
});

const descriptionsPhoto = Array.from({length: DESCRIPTION_COUNT}, createDescriptionPhoto)

