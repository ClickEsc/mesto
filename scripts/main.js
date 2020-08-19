const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
];

const initialCardsContainer = document.querySelector('.photo-gallery');
const addCardForm = document.querySelector('#addCardForm');

// Карточка

const addItemToContainer = (card) => {
  const newCard = document.querySelector('#cardTemplate').content.cloneNode(true);
  
  const cardTitle = card.name;
  const cardLink = card.link;

  newCard.querySelector('.photo-gallery__heading').textContent = cardTitle;
  newCard.querySelector('.photo-gallery__image').setAttribute('src', cardLink);

  // Проставление лайков
  newCard.querySelector('.photo-gallery__like-button').addEventListener('click', event => {
    event.target.closest('.photo-gallery__like-button').classList.toggle('photo-gallery__like-button_clicked');
  });

  // Удаление карточки
  newCard.querySelector('.photo-gallery__remove-button').addEventListener('click', event => {
    event.target.closest('.photo-gallery__item').remove();
  });

  // Просмотр фотографий

  newCard.querySelector('.photo-gallery__image').addEventListener('click', event => {
    document.querySelector('.popup_show-image').classList.toggle('popup_opened');
    
    document.querySelector('.popup__image').src = cardLink;
    document.querySelector('.popup__caption').textContent = cardTitle;
  });
  
  initialCardsContainer.prepend(newCard);

};

initialCards.forEach(addItemToContainer);


// Попап редактирования профиля

const editProfilePopup = document.querySelector('.popup_edit-profile')
const editProfilePopupOpenButton = document.querySelector('.profile__edit-button');
const editProfilePopupCloseButton = editProfilePopup.querySelector('.popup__close_edit-profile');
const editProfilePopupSaveButton = editProfilePopup.querySelector('.popup__save_edit-profile');

const username = document.querySelector('.profile__username');
const bio = document.querySelector('.profile__bio');
const nameInput = editProfilePopup.querySelector('.popup__username');
const bioInput = editProfilePopup.querySelector('.popup__bio');

nameInput.value = username.textContent;
bioInput.value = bio.textContent;

const editProfilePopupToggle = function(event) {
  editProfilePopup.classList.toggle('popup_opened');
}

const editProfilePopupClose = function(event) {
  if (event.target !== event.currentTarget) {
    return;
  } else {
    editProfilePopupToggle(event);
  }
}

const editProfileFormElement = document.querySelector('.popup__container_edit-profile');

function editProfileFormSubmitHandler(event) {
  event.preventDefault();

  username.textContent = nameInput.value;
  bio.textContent = bioInput.value;
  
  editProfilePopupToggle(event);
}

editProfileFormElement.addEventListener('submit', editProfileFormSubmitHandler);

editProfilePopupOpenButton.addEventListener('click', editProfilePopupToggle);
editProfilePopupCloseButton.addEventListener('click', editProfilePopupToggle);
editProfilePopup.addEventListener('click', editProfilePopupClose);


// Попап добавления карточек

const addCardPopup = document.querySelector('.popup_add-card')
const addCardPopupOpenButton = document.querySelector('.profile__add-button');
const addCardPopupCloseButton = addCardPopup.querySelector('.popup__close_add-card');
const addCardPopupSaveButton = addCardPopup.querySelector('.popup__save_add-card');

const placeNameInput = addCardPopup.querySelector('.popup__place-name');
const placeLinkInput = addCardPopup.querySelector('.popup__place-link');

const addCardPopupToggle = function(event) {
  addCardPopup.classList.toggle('popup_opened');
}

const addCardPopupClose = function(event) {
  if (event.target !== event.currentTarget) {
    return;
  } else {
    addCardPopupToggle(event);
  }
}

const addCardFormElement = document.querySelector('.popup__container_add-card');

function addCardFormSubmitHandler(event) {
  event.preventDefault();

  const addedCard = {
    name: placeNameInput.value,
    link: placeLinkInput.value
  }

  addItemToContainer(addedCard);
   
  addCardFormElement.reset();
  addCardPopupToggle(event);
}

addCardFormElement.addEventListener('submit', addCardFormSubmitHandler);

addCardPopupOpenButton.addEventListener('click', addCardPopupToggle);
addCardPopupCloseButton.addEventListener('click', addCardPopupToggle);
addCardPopup.addEventListener('click', addCardPopupClose);


// Попап просмотра фотографий

const showImagePopup = document.querySelector('.popup_show-image')

const showImagePopupCloseButton = showImagePopup.querySelector('.popup__close_show-image');

//imageShown.src = cardLink.value;
//imageCaption.textContent = cardTitle.value; 

const showImagePopupToggle = function(event) {
  showImagePopup.classList.toggle('popup_opened');
}

const showImagePopupClose = function(event) {
  if (event.target !== event.currentTarget) {
    return;
  } else {
    showImagePopupToggle(event);
  }
}

showImagePopupCloseButton.addEventListener('click', showImagePopupToggle);
showImagePopup.addEventListener('click', showImagePopupClose);