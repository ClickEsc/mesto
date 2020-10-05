import './pages/index.css';

import { 
  initialCards, 
  initialCardsContainerSelector,

  editProfileForm,
  editProfilePopupOpenButton,
  profileInfo,

  addCardPopupOpenButton,
  addCardPopupSaveButton,
  placeNameInput,
  placeLinkInput,

  showImagePopupCloseButton } from './utils/constants.js';

import Section from './components/Section.js';

import Card from './components/Card.js';

import Popup from './components/Popup.js';

import PopupWithImage from './components/PopupWithImage.js';

import PopupWithForm from './components/PopupWithForm.js';

import UserInfo from './components/UserInfo.js';

import { formData, FormValidator } from './components/FormValidator.js';

// Глобальные переменные

const initialCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.name, item.link, item.alt, item.isLiked, '#cardTemplate', handleCardClick);
    const cardElement = card.createCard();
    initialCardList.addItem(cardElement);
    cardElement.addEventListener('click', () => {
      handleCardClick(card);
    });
  }
}, initialCardsContainerSelector);

const handleCardClick = (card) => {
  showImagePopup.open(card);
}

const userInfo = new UserInfo(profileInfo);



const submitEditProfileForm = function(event) {
  event.preventDefault();
  
  userInfo.setUserInfo();
  
  editProfilePopup.close();
}

const editProfilePopup = new PopupWithForm('.popup_edit-profile', submitEditProfileForm);






// Слушатели попапа редактирования профиля
editProfilePopupOpenButton.addEventListener('click', () => {
  userInfo.getUserInfo();
  editProfileFormValidator.enableValidation();
  editProfilePopup.open();
});


// Функции попапа добавления карточек
const submitAddCardForm = function(event) {
  event.preventDefault();

  const addedCard = new Card(
    placeNameInput.value, 
    placeLinkInput.value, 
    'Фотография из места под названием' + ' ' + placeNameInput.value, 
    false,
    '#cardTemplate',
    handleCardClick);

  initialCardList.addItem(addedCard.createCard());

  addCardForm.reset();
  
  addCardFormValidator.disableSubmitButton(addCardPopupSaveButton);

  addCardPopup.close();
}

// Попап добавления карточек
export const addCardPopup = new PopupWithForm('.popup_add-card', submitAddCardForm);

// Слушатели попапа добавления карточек
addCardPopupOpenButton.addEventListener('click', () => addCardPopup.open());


// Попап просмотра фотографий
export const showImagePopup = new PopupWithImage('.popup_show-image');


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