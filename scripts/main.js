let popup = document.querySelector('.popup')
let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = popup.querySelector('.popup__close');
let popupSaveButton = popup.querySelector('.popup__save');

let popupToggle = function(event) {
  popup.classList.toggle('popup_opened');
}

let popupClose = function(event) {
  if (event.target !== event.currentTarget) {
    return;
  } else {
    popupToggle(event);
  }
}

let formElement = document.querySelector('.popup__container');

function formSubmitHandler(event) {
  event.preventDefault();

  let username = document.querySelector('.profile__username');
  let bio = document.querySelector('.profile__bio');

  let nameInput = popup.querySelector('.popup__username');
  let bioInput = popup.querySelector('.popup__bio');

  username.textContent = nameInput.value;
  bio.textContent = bioInput.value;
  
  popupToggle(event);
}

formElement.addEventListener('submit', formSubmitHandler);

popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
popup.addEventListener('click', popupClose);