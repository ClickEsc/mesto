// Глобальные переменные

export const formData = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector:'.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorTextClass: 'popup__error-text',
  errorClass: 'popup__error-text_visible'
}

// Переменные селекторов
export const initialCardsContainerSelector = '.photo-gallery';
export const cardTemplateSelector = '#cardTemplate';
export const popupSelector = document.querySelector('.popup');
export const editProfilePopupSelector = '.popup_edit-profile';
export const addCardPopupSelector = '.popup_add-card';
export const showImagePopupSelector = '.popup_show-image';
export const confirmPopupSelector = '.popup_confirm';
export const loadAvatarPopupSelector = '.popup_load-avatar';


// Переменные попапа редактирования профиля
export const editProfileForm = document.querySelector('.popup__form_edit-profile');
export const editProfilePopupOpenButton = document.querySelector('.profile__edit-button_user-info');
export const editProfilePopupCloseButton = document.querySelector('.popup__close_edit-profile');
export const editProfilePopupSaveButton = document.querySelector('.popup__save');

export const nameInput = document.querySelector('.popup__username');
export const bioInput = document.querySelector('.popup__bio');

export const profileInfo = {
  username: '.profile__username',
  bio: '.profile__bio',
  avatar: '.profile__avatar'
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

// Переменные попапа подтверждения удаления карточек

// Переменные попапа замены аватара
export const loadAvatarForm = document.querySelector('.popup__form_load-avatar');
export const loadAvatarPopupOpenButton = document.querySelector('.profile__edit-button_avatar');
export const loadAvatarPopupSaveButton = document.querySelector('.popup__save_load-avatar');

export const avatarInput = document.querySelector('.popup__avatar-link');