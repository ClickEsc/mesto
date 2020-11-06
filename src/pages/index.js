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

  confirmPopupSelector,

  loadAvatarPopupSelector,
  loadAvatarForm,
  loadAvatarPopupOpenButton,
  loadAvatarPopupSaveButton } from '../utils/constants.js';

import Section from '../components/Section.js';

import Card from '../components/Card.js';

import PopupWithImage from '../components/PopupWithImage.js';

import PopupWithForm from '../components/PopupWithForm.js';

import PopupWithSubmit from '../components/PopupWithSubmit.js';

import UserInfo from '../components/UserInfo.js';

import FormValidator from '../components/FormValidator.js';


// Глобальные переменные

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
  headers: {
    authorization: '6e218dd6-3398-4e8b-ab7c-72e842f1ee4b',
    "Content-Type": "application/json"
  }
})

const createCard = ({ data, handleCardClick, handleLikeClick, handleDeleteIconClick }, cardTemplate, userId, cardList) => {
  const card = new Card({ 
    data, 
    handleCardClick: (card) => {
      showImagePopup.open(card);
    },
    handleLikeClick: (data) => {
      if (card.checkLikeState() === false) {
        api.putLike(data)
        .then((res) => {
          res.likes.length += 1
          card.countLikes();
        })
        .catch((err) => {
          console.log(`Ошибка при добавлении лайка: ${err}`)
        })
      } else {
        api.deleteLike(data)
        .then((res) => {
          res.likes.length -= 1
          card.countLikes();
        })
        .catch((err) => {
          console.log(`Ошибка при удалении лайка: ${err}`)
        })
      }
    },
    handleDeleteIconClick: (data) => {
      const confirmDelCardPopup = new PopupWithSubmit(
        confirmPopupSelector, {
          formSubmitHandler: () => {
          return api.deleteCard(data)
            .then(() => {
              return card.deleteCardElement();
            })
            .catch(err => console.log(`Ошибка при удалении карточки: ${err}`))
            .finally(() => {
              confirmDelCardPopup.close();
            })
          }
      })
      confirmDelCardPopup.setEventListeners();
      confirmDelCardPopup.open();
    } 
  }, cardTemplate, userId, cardList);
  const cardElement = card.createCard();
  cardList.addItem(cardElement);
  return cardElement;
}

// Для отрисовки страницы только после получения всех данных
Promise.all([api.getUserInfo(), api.getInitialCards()])    
       .then((values) => {
          const [userData, initialCards] = values;
          return [userData, initialCards]
        })
        .then(([userData, initialCards]) => {
          // Установка данных профиля пользователя
          userInfo.setUserInfo({ username: userData.name, bio: userData.about });
          userInfo.setUserAvatar({ avatar: userData.avatar })
          return [userData, initialCards]
        })
        .then(([userData, initialCards]) => {
          // Получение id пользователя
          const myId = userData._id
          // Получение списка карточек
          const initialCardList = new Section({
            items: initialCards,
            renderer: (item) => {
              createCard({
                data: item
              }, cardTemplateSelector, myId, initialCardList)
            },
          }, initialCardsContainerSelector);
      
          return initialCardList;
        })
        .then((initialCardList) => {
          initialCardList.renderItems();
            return initialCardList
        })
        .then((initialCardList) => {
          // Попап добавления карточек
          const addCardPopup = new PopupWithForm(addCardPopupSelector, {
            formSubmitHandler: (data) => {
              addCardFormValidator.disableSubmitButton(addCardPopupSaveButton);
              showLoadingState(true, addCardPopupSaveButton);
              api.postCard(data)
                 .then((info) => {
                   return createCard({
                      data: info,
                    }, 
                      cardTemplateSelector, info.owner._id, initialCardList);
                  })
                .then(() => {
                  return addCardPopup.close();
                })
                .catch(err => console.log(`Ошибка при добавлении новой карточки: ${err}`))
                .finally(() => {
                  showLoadingState(false, addCardPopupSaveButton);
                })
            }
          })
          return addCardPopup
        })
        .then((addCardPopup) => {
          addCardPopup.setEventListeners();
          return addCardPopup
        })
        .then((addCardPopup) => {
          // Слушатели попапа добавления карточек
          addCardPopupOpenButton.addEventListener('click', () => {
          addCardFormValidator.resetForm();
          addCardPopup.open();
          });
        })
        
          
// Изменение информации о пользователе

const userInfo = new UserInfo(profileInfo);

const editProfilePopup = new PopupWithForm(editProfilePopupSelector, {
  formSubmitHandler: (data) => {
    showLoadingState(true, addCardPopupSaveButton);
    api.editUserInfo({ name: data.name, about: data.about })
      .then((info) => {
        return userInfo.setUserInfo({ username: info.name, bio: info.about })
      })
      .then(() => {
        return editProfilePopup.close()
      })
      .catch(err => console.log(`Ошибка при обновлении информации о пользователе: ${err}`))
      .finally(() => {
        showLoadingState(false, addCardPopupSaveButton);
      })
  }
})

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

const loadAvatarPopup = new PopupWithForm(loadAvatarPopupSelector, {
  formSubmitHandler: (data) => {
    loadAvatarFormValidator.disableSubmitButton(loadAvatarPopupSaveButton);
    showLoadingState(true, loadAvatarPopupSaveButton);
    return api.changeUserAvatar({ avatar: data.avatar })
      .then((info) => {
        userInfo.setUserAvatar({ avatar: info.avatar })
      })
      .catch(err => console.log(`Ошибка при замене аватара пользователя: ${err}`))
      .finally(() => {
        showLoadingState(false, addCardPopupSaveButton);
        loadAvatarPopup.close();
      })
  }
})

loadAvatarPopupOpenButton.addEventListener('click', () => {
  loadAvatarFormValidator.resetForm();
  loadAvatarPopup.open();
});


// Попап просмотра фотографий
const showImagePopup = new PopupWithImage(showImagePopupSelector);


// Функция уведомления о процессе загрузки данных
const showLoadingState = function(isLoading, button) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    return;
  }
}

// Добавление слушателей в попапы
editProfilePopup.setEventListeners();
/*addCardPopup.setEventListeners();*/
showImagePopup.setEventListeners();
loadAvatarPopup.setEventListeners();


// Валидация форм

// Экземпляр класса FormValidator для попапа редактирования профиля
const editProfileFormValidator = new FormValidator({ formData: formData }, editProfileForm);
editProfileFormValidator.enableValidation();

// Экземпляр класса FormValidator для попапа просмотра фотографий
const addCardFormValidator = new FormValidator({ formData: formData }, addCardForm);
addCardFormValidator.enableValidation();

// Экземпляр класса FormValidator для попапа обновления аватара
const loadAvatarFormValidator = new FormValidator({ formData: formData }, loadAvatarForm);
loadAvatarFormValidator.enableValidation();