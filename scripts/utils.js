import { setEscListener } from './index.js';
export const addCardForm = document.querySelector('.popup__form_add-card');


export const editProfileForm = document.querySelector('.popup__form_edit-profile');

// Переменные попапа просмотра фотографий

export const showImagePopup = document.querySelector('.popup_show-image');
export const showImagePopupCloseButton = showImagePopup.querySelector('.popup__close_show-image');
export const imageShown = showImagePopup.querySelector('.popup__image');
export const imageShownCaption = showImagePopup.querySelector('.popup__caption');


// Функция открытия модальных окон
export const openPopup = function(popup) {
  popup.classList.add('popup_opened');
  setEscListener();
}