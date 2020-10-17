import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, { formSubmitHandler }) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('.popup__save').addEventListener('submit', () => {
      this._formSubmitHandler();
    });
  }
}