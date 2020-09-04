// Глобальные переменные

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Фотография многообразных горных склонов, Архыз'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Фотография реки, уходящей вдаль, с высокими каменистыми заснеженными берегами и лесом, Челябинская область'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Фотография ряда типовых жилых многоэтажных домов в сумерках, вид сверху анфас, Иваново'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Фотография земли и растительности на подходе к холму и горе с заснеженными склонами вдали, Камчатка'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Фотография железнодорожного пути среди лесов, вид сверху, Холмогорский район'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Фотография яркого неба и горного утёса, омываемого водой, на лесистой заснеженной береговой линии'
  },
];

const initialCardsContainer = document.querySelector('.photo-gallery');

// Переменные попапа редактирования профиля

const editProfileForm = document.querySelector('.popup__container_edit-profile');

const editProfilePopup = document.querySelector('.popup_edit-profile');
const editProfilePopupOpenButton = document.querySelector('.profile__edit-button');
const editProfilePopupCloseButton = editProfilePopup.querySelector('.popup__close_edit-profile');

const username = document.querySelector('.profile__username');
const bio = document.querySelector('.profile__bio');
const nameInput = editProfilePopup.querySelector('.popup__username');
const bioInput = editProfilePopup.querySelector('.popup__bio');

// Переменные попапа добавления карточек

const addCardForm = document.querySelector('.popup__container_add-card');

const addCardPopup = document.querySelector('.popup_add-card');
const addCardPopupOpenButton = document.querySelector('.profile__add-button');
const addCardPopupCloseButton = addCardPopup.querySelector('.popup__close_add-card');
const addCardPopupSaveButton = addCardPopup.querySelector('.popup__save_add-card');

const placeNameInput = addCardPopup.querySelector('.popup__place-name');
const placeLinkInput = addCardPopup.querySelector('.popup__place-link');

// Переменные попапа просмотра фотографий

const showImagePopup = document.querySelector('.popup_show-image');
const showImagePopupCloseButton = showImagePopup.querySelector('.popup__close_show-image');
const imageShown = showImagePopup.querySelector('.popup__image');
const imageShownCaption = showImagePopup.querySelector('.popup__caption');


// Функции

// Функция обработки состояния лайка
const handleLikeButton = (event) => {
  event.target.closest('.photo-gallery__like-button').classList.toggle('photo-gallery__like-button_clicked');
}

// Функция удаления карточки
const removeCard = (event) => {
  event.target.closest('.photo-gallery__item').remove();
}

// Функция создания карточки

const createCard = (card) => {
  const newCard = document.querySelector('#cardTemplate').content.cloneNode(true);

  //  Переменные новой карточки
  const newCardTitle = newCard.querySelector('.photo-gallery__heading');
  const newCardImage = newCard.querySelector('.photo-gallery__image');
  const newCardLikeButton = newCard.querySelector('.photo-gallery__like-button');
  const newCardRemoveButton = newCard.querySelector('.photo-gallery__remove-button');
  
  // Переменные значений элемента массива
  const cardTitle = card.name;
  const cardLink = card.link;
  const cardAlt = card.alt;

  newCardTitle.textContent = cardTitle;
  newCardImage.setAttribute('src', cardLink);
  newCardImage.setAttribute('alt', cardAlt);

  // Проставление лайков
  newCardLikeButton.addEventListener('click', handleLikeButton);

  // Удаление карточки
  newCardRemoveButton.addEventListener('click', removeCard);

  // Просмотр фотографий
  newCardImage.addEventListener('click', () => setShowImagePopupValues(card));

  newCardImage.addEventListener('click', () => openPopup(showImagePopup));
   
  return newCard;

};

// Функция добавления карточки

const addCard = (card) => {
  initialCardsContainer.prepend(createCard(card));
} 

// Функция открытия модальных окон
const openPopup = function(popup) {
  popup.classList.add('popup_opened');
  setEscListener();
}

// Функция закрытия модальных окон
const closePopup = function(popup) {
  popup.classList.remove('popup_opened');
  removeEscListener();
}

// Функция закрытия модальных окон при нажатии Esc
const closePopupWithEsc = function(event) {
  const popupOpened = document.querySelector('.popup_opened');
  if (event.key === 'Escape') {
    closePopup(popupOpened);
  }
}

// Функция добавления слушателя нажатия на Esc
const setEscListener = function() {
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
  openPopup(editProfilePopup);
});

editProfilePopupCloseButton.addEventListener('click', () => closePopup(editProfilePopup));

editProfilePopup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) { 
    closePopup(editProfilePopup);
  }
});

// Функции попапа добавления карточек

const submitAddCardForm = function(event) {
  event.preventDefault();

  const addedCard = {
    name: placeNameInput.value,
    link: placeLinkInput.value,
    alt: 'Фотография из места под названием' + ' ' + placeNameInput.value
  }

  createCard(addedCard);
  addCard(addedCard);
   
  addCardForm.reset();
  addCardPopupSaveButton.setAttribute('disabled', '');
  addCardPopupSaveButton.classList.add('popup__save_disabled');
  closePopup(addCardPopup);
}

// Слушатели попапа добавления карточек

addCardForm.addEventListener('submit', submitAddCardForm);

addCardPopupOpenButton.addEventListener('click', () => openPopup(addCardPopup));

addCardPopupCloseButton.addEventListener('click', () => closePopup(addCardPopup));

addCardPopup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) { 
    closePopup(addCardPopup);
  }
});

// Функция попапа просмотра фотографий

const setShowImagePopupValues = function(card) {
  imageShown.src = card.link;
  imageShown.alt = card.alt;
  imageShownCaption.textContent = card.name;
};

// Слушатели попапа просмотра фотографий

showImagePopupCloseButton.addEventListener('click', () => closePopup(showImagePopup));

showImagePopup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) { 
    closePopup(showImagePopup);
  }
});


// Изначальное отображение карточек

initialCards.forEach(addCard);