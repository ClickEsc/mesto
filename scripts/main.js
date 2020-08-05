let popup = document.querySelector('.popup')
let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = popup.querySelector('.popup__close');

let popupToggle = function() {
  popup.classList.toggle('popup_opened');
}

/*popupToggle();*/

popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);


/*console.log({
  popup,
  popupOpenButton,
  popupCloseButton,
})*/