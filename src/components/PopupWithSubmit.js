import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, { formSubmitHandler }) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('.popup__form').addEventListener('submit', (event) => {
      event.preventDefault();
      this._formSubmitHandler();
    });
  }
}