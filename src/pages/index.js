import './index.css';

import { 
  initialCards, 
  formData,

  initialCardsContainerSelector,
  cardTemplateSelector,
  editProfilePopupSelector,
  addCardPopupSelector,
  showImagePopupSelector,

  editProfileForm,
  editProfilePopupOpenButton,
  editProfilePopupSaveButton,
  nameInput,
  bioInput,
  profileInfo,

  addCardForm,
  addCardPopupOpenButton,
  addCardPopupSaveButton,
  placeNameInput,
  placeLinkInput } from '../utils/constants.js';

import Section from '../components/Section.js';

import Card from '../components/Card.js';

import PopupWithImage from '../components/PopupWithImage.js';

import PopupWithForm from '../components/PopupWithForm.js';

import UserInfo from '../components/UserInfo.js';

import FormValidator from '../components/FormValidator.js';

// Глобальные переменные

const initialCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    createCard(item.name, item.link, cardTemplateSelector, handleCardClick);
  }
}, initialCardsContainerSelector);

const handleCardClick = (card) => {
  showImagePopup.open(card);
}

const createCard = (name, link) => {
  const card = new Card(name, link, cardTemplateSelector, handleCardClick);
  const cardElement = card.createCard();
  return cardElement
}

initialCards.forEach(({ name, link }) => {
  initialCardList.addItem(createCard(name, link));
});

const userInfo = new UserInfo(profileInfo);

const submitEditProfileForm = function(editProfileForm) {
  
  userInfo.setUserInfo({ username: nameInput.value, bio: bioInput.value });
  
  editProfilePopup.close();
}

const editProfilePopup = new PopupWithForm(editProfilePopupSelector, submitEditProfileForm);

// Слушатели попапа редактирования профиля
editProfilePopupOpenButton.addEventListener('click', () => {
  editProfileFormValidator.resetForm();

  const getUserInfo = userInfo.getUserInfo();
  nameInput.value = getUserInfo.username;
  bioInput.value = getUserInfo.bio;

  editProfileFormValidator.enableSubmitButton(editProfilePopupSaveButton);

  editProfilePopup.open();
});


// Функции попапа добавления карточек
const submitAddCardForm = function(addCardForm) {
  initialCardList.addItem(createCard(placeNameInput.value, placeLinkInput.value));
  
  addCardFormValidator.disableSubmitButton(addCardPopupSaveButton);

  addCardPopup.close();
}

// Попап добавления карточек
const addCardPopup = new PopupWithForm(addCardPopupSelector, submitAddCardForm);

// Слушатели попапа добавления карточек
addCardPopupOpenButton.addEventListener('click', () => {
  addCardFormValidator.resetForm();
  addCardPopup.open();
});


// Попап просмотра фотографий
const showImagePopup = new PopupWithImage(showImagePopupSelector);


// Добавление слушателей в попапы
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
showImagePopup.setEventListeners();


// Валидация форм

// Экземпляр класса FormValidator для попапа редактирования профиля
const editProfileFormValidator = new FormValidator(formData, editProfileForm);
editProfileFormValidator.enableValidation();

// Экземпляр класса FormValidator для попапа просмотра фотографий
const addCardFormValidator = new FormValidator(formData, addCardForm);
addCardFormValidator.enableValidation();


// Отображение карточек
initialCardList.renderItems();