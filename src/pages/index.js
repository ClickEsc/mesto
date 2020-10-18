import Api from '../components/Api.js';

import './index.css';

import {  
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
  placeLinkInput,

  confirmPopupSelector,

  loadAvatarPopupSelector,
  loadAvatarForm,
  loadAvatarPopupOpenButton,
  loadAvatarPopupSaveButton,
  avatarInput } from '../utils/constants.js';

import Section from '../components/Section.js';

import Card from '../components/Card.js';

import PopupWithImage from '../components/PopupWithImage.js';

import PopupWithForm from '../components/PopupWithForm.js';

import PopupWithSubmit from '../components/PopupWithSubmit.js';

import UserInfo from '../components/UserInfo.js';

import FormValidator from '../components/FormValidator.js';


// Глобальные переменные

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: 'c664b7c0-543b-42b8-92f0-bd76ef6717a6',
    "Content-Type": "application/json"
  }
})

const createCard = ({ data, handleCardClick, handleLikeClick, handleDeleteIconClick }, cardTemplate) => {
  const card = new Card({ data, handleCardClick, handleLikeClick, handleDeleteIconClick }, cardTemplate);
  const cardElement = card.createCard();

  return cardElement;
}


const getMyId = () => {
  api
    .getUserInfo()
    .then((res) => {
      return res._id
    })
}

getMyId();

// Отрисовка на странице начальных карточек

const initialCards = api.getInitialCards();


const anyCardId = initialCards.then((res) => {
  res.forEach((card) => {
    return card.owner._id
   })
})

initialCards
  .then((res) => {
    const initialCardList = new Section({
      items: res,
      renderer: (item) => {
        createCard({
          data: item,
          handleCardClick: (item) => {
            showImagePopup.open(item);
          }, 
          handleLikeClick: (item) => {
            console.log(item.likes)
            api.putLikes(item)
              .then((res) => {
                item.likes.length += 1
              })
              .catch((err) => {
                console.log('Что-то пошло не так. Текст ошибки:' + err)
              });
          },
          handleDeleteIconClick: (item) => {
            handleConfirmDelCard(item); 
          }
        }, cardTemplateSelector)
      },
    }, initialCardsContainerSelector);

    return initialCardList;
  })
  .then((initialCardList) => {
    initialCardList._renderedItems.forEach((card) => {
      initialCardList.addItem(createCard({
        data: card,
        handleCardClick: (card) => {
          showImagePopup.open(card)
        },
        handleLikeClick: (card) => {
          api.putLikes(card)
            .then((res) => {
              card.likes.length += 1
            })
            .catch((err) => {
              console.log('Что-то пошло не так. Текст ошибки:' + err)
            });
        }, 
        handleDeleteIconClick: (card) => {
          handleConfirmDelCard(card);
        } 
      }, 
        cardTemplateSelector));
      
      initialCardList.renderItems();
    })
    return initialCardList
  })
  .catch((err) => {
    console.log('Что-то пошло не так. Текст ошибки:' + err)
  })


  
// Изменение информации о пользователе

const userInfo = new UserInfo(profileInfo);

// Получение информации о пользователе
api
  .getUserInfo()
  .then((res) => {
    document.querySelector(profileInfo.username).textContent = res.name;
    document.querySelector(profileInfo.bio).textContent = res.about;
    document.querySelector(profileInfo.avatar).src = res.avatar;
  })
  .catch((err) => {
    console.log('Что-то пошло не так. Текст ошибки:' + err)
  });

// Функция уведомления о процессе загрузки данных
const showLoadingState = function(isLoading, button) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    return;
  }
}

const submitEditProfileForm = function(editProfileForm) {
  showLoadingState(true, editProfilePopupSaveButton);

  api.editUserInfo({name: nameInput.value, about: bioInput.value});
  
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


// Замена аватара

const submitLoadAvatarForm = function(loadAvatarForm) {
  showLoadingState(true, loadAvatarPopupSaveButton);
  
  api.changeUserAvatar(avatarInput.value);

  loadAvatarFormValidator.enableSubmitButton(loadAvatarPopupSaveButton);
  loadAvatarPopup.close();
}

const loadAvatarPopup = new PopupWithForm(loadAvatarPopupSelector, submitLoadAvatarForm);

loadAvatarPopupOpenButton.addEventListener('click', () => {
  loadAvatarFormValidator.resetForm();
  loadAvatarPopup.open();
});


// Функции попапа добавления карточек
const submitAddCardForm = function(addCardForm) {
  showLoadingState(true, addCardPopupSaveButton);
  
  api.postCard({ name: placeNameInput.value, link: placeLinkInput.value })

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

const createdByMe = function(card) {
  if (card.owner._id = '6937c4952c5ef72e3d6f90c9') {
    return true
  }
}

const handleConfirmDelCard = (card) => {
  const confirmDelCardPopup = new PopupWithSubmit(
    confirmPopupSelector, {
      formSubmitHandler: () => {
      api.deleteCard(card)
        .catch((err) => {
          console.log('Что-то пошло не так. Текст ошибки:' + err)
        });
    }
  })
  /*confirmDelCardPopup.close(); */
  confirmDelCardPopup.open();
  confirmDelCardPopup.setEventListeners();
}


// Добавление слушателей в попапы
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
showImagePopup.setEventListeners();
loadAvatarPopup.setEventListeners();


// Валидация форм

// Экземпляр класса FormValidator для попапа редактирования профиля
const editProfileFormValidator = new FormValidator(formData, editProfileForm);
editProfileFormValidator.enableValidation();

// Экземпляр класса FormValidator для попапа просмотра фотографий
const addCardFormValidator = new FormValidator(formData, addCardForm);
addCardFormValidator.enableValidation();

// Экземпляр класса FormValidator для попапа обновления аватара
const loadAvatarFormValidator = new FormValidator(formData, loadAvatarForm);
loadAvatarFormValidator.enableValidation();