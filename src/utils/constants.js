import Card from '../components/Card.js';

import PopupWithImage from '../components/PopupWithImage.js';

import PopupWithForm from '../components/PopupWithForm.js';

// Глобальные переменные

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Фотография многообразных горных склонов, Архыз',
    isLiked: false
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Фотография реки, уходящей вдаль, с высокими каменистыми заснеженными берегами и лесом, Челябинская область',
    isLiked: false
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Фотография ряда типовых жилых многоэтажных домов в сумерках, вид сверху анфас, Иваново',
    isLiked: false
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Фотография земли и растительности на подходе к холму и горе с заснеженными склонами вдали, Камчатка',
    isLiked: false
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Фотография железнодорожного пути среди лесов, вид сверху, Холмогорский район',
    isLiked: false
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Фотография яркого неба и горного утёса, омываемого водой, на лесистой заснеженной береговой линии',
    isLiked: false
  },
];

export const initialCardsContainerSelector = '.photo-gallery';

export const popupSelector = document.querySelector('.popup');


// Переменные попапа редактирования профиля
export const editProfileForm = document.querySelector('.popup__form_edit-profile');
export const editProfilePopupOpenButton = document.querySelector('.profile__edit-button');
export const editProfilePopupCloseButton = document.querySelector('.popup__close_edit-profile');
export const editProfilePopupSaveButton = document.querySelector('.popup__save');

export const profileInfo = {
  username: '.profile__username',
  bio: '.profile__bio',
};

// Переменные попапа добавления карточек



export const addCardForm = document.querySelector('.popup__form_add-card');

export const addCardPopupOpenButton = document.querySelector('.profile__add-button');
export const addCardPopupCloseButton = document.querySelector('.popup__close_add-card');
export const addCardPopupSaveButton = document.querySelector('.popup__save_add-card');

export const placeNameInput = document.querySelector('.popup__place-name');
export const placeLinkInput = document.querySelector('.popup__place-link');


// Переменные попапа просмотра фотографий

export const showImagePopupCloseButton = document.querySelector('.popup__close_show-image');
export const imageShown = document.querySelector('.popup__image');
export const imageShownCaption = document.querySelector('.popup__caption');


