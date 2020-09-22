import { openPopup } from './utils.js';

import { showImagePopup, showImagePopupCloseButton } from './constants.js';

import { Card } from './Card.js';

import { formData, FormValidator } from './FormValidator.js';

// Глобальные переменные

const initialCards = [
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

const initialCardsContainer = document.querySelector('.photo-gallery');


// Экземпляры класса Card для каждой карточки
initialCards.forEach((item) => { 
  const card = new Card(item.name, item.link, item.alt, item.isLiked, '#cardTemplate'); 
  initialCardsContainer.prepend(card.createCard());
}); 


// Переменные попапа редактирования профиля

const editProfileForm = document.querySelector('.popup__form_edit-profile');

const editProfilePopup = document.querySelector('.popup_edit-profile');
const editProfilePopupOpenButton = document.querySelector('.profile__edit-button');
const editProfilePopupCloseButton = editProfilePopup.querySelector('.popup__close_edit-profile');
const editProfilePopupSaveButton = editProfilePopup.querySelector('.popup__save');

const username = document.querySelector('.profile__username');
const bio = document.querySelector('.profile__bio');
const nameInput = editProfilePopup.querySelector('.popup__username');
const bioInput = editProfilePopup.querySelector('.popup__bio');

// Переменные попапа добавления карточек

const addCardForm = document.querySelector('.popup__form_add-card');

const addCardPopup = document.querySelector('.popup_add-card');
const addCardPopupOpenButton = document.querySelector('.profile__add-button');
const addCardPopupCloseButton = addCardPopup.querySelector('.popup__close_add-card');
const addCardPopupSaveButton = addCardPopup.querySelector('.popup__save_add-card');

const placeNameInput = addCardPopup.querySelector('.popup__place-name');
const placeLinkInput = addCardPopup.querySelector('.popup__place-link');


// Функция закрытия модальных окон
const closePopup = function(popup) {
  popup.classList.remove('popup_opened');
  removeEscListener();
}

// Функция закрытия модальных окон при нажатии на оверлей
const closePopupFromOverlay = function(event) {
  const popupOpened = document.querySelector('.popup_opened');
  if (event.target === event.currentTarget) {
    closePopup(popupOpened);
  }
}

// Функция закрытия модальных окон при нажатии Esc
const closePopupWithEsc = function(event) {
  const popupOpened = document.querySelector('.popup_opened');
  if (event.key === 'Escape') {
    closePopup(popupOpened);
  }
}

// Функция добавления слушателя нажатия на Esc
export const setEscListener = function() {
  document.addEventListener('keydown', closePopupWithEsc);
}

// Функция удаления слушателя нажатия на Esc
const removeEscListener = function() {
  document.removeEventListener('keydown', closePopupWithEsc);
}

// Функции попапа редактирования профиля

const setEditProfileValues = function(username, bio) {
  nameInput.value = username.textContent;
  bioInput.value = bio.textContent;
}

const setEditProfilePopupValues = function(nameInput, bioInput) {
  username.textContent = nameInput.value;
  bio.textContent = bioInput.value;
}

const submitEditProfileForm = function(event) {
  event.preventDefault();
  
  setEditProfilePopupValues(nameInput, bioInput);
  
  closePopup(editProfilePopup);
}

// Слушатели попапа редактирования профиля

editProfileForm.addEventListener('submit', submitEditProfileForm);

editProfilePopupOpenButton.addEventListener('click', () => {
  setEditProfileValues(username, bio);

  editProfilePopupSaveButton.removeAttribute('disabled', ''); 
  editProfilePopupSaveButton.classList.remove('popup__save_disabled');

  openPopup(editProfilePopup);
});

editProfilePopupCloseButton.addEventListener('click', () => closePopup(editProfilePopup));

editProfilePopup.addEventListener('click', closePopupFromOverlay);

// Функции попапа добавления карточек

const submitAddCardForm = function(event) {
  event.preventDefault();

  const addedCard = new Card(
    placeNameInput.value, 
    placeLinkInput.value, 
    'Фотография из места под названием' + ' ' + placeNameInput.value, 
    false,
    '#cardTemplate');

  initialCardsContainer.prepend(addedCard.createCard());
   
  addCardForm.reset();
  
  addCardPopupSaveButton.setAttribute('disabled', ''); 
  addCardPopupSaveButton.classList.add('popup__save_disabled'); 

  closePopup(addCardPopup);
}

// Слушатели попапа добавления карточек

addCardForm.addEventListener('submit', submitAddCardForm);

addCardPopupOpenButton.addEventListener('click', () => openPopup(addCardPopup));

addCardPopupCloseButton.addEventListener('click', () => closePopup(addCardPopup));

addCardPopup.addEventListener('click', closePopupFromOverlay);

// Слушатели попапа просмотра фотографий

showImagePopupCloseButton.addEventListener('click', () => closePopup(showImagePopup));

showImagePopup.addEventListener('click', closePopupFromOverlay);


// Валидация форм

// Экземпляр класса FormValidator для попапа редактирования профиля
const editProfileFormValidator = new FormValidator(formData, editProfileForm);
editProfileFormValidator.enableValidation();

// Экземпляр класса FormValidator для попапа просмотра фотографий
const addCardFormValidator = new FormValidator(formData, addCardForm);
addCardFormValidator.enableValidation();