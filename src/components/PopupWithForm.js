import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._formSubmitHandler = formSubmitHandler;
  }

  _getInputValues() {
    
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._form.reset();
  }

  setEventListeners() {
    this._closeButton = this._popup.querySelector('.popup__close');
    this._closeButton.addEventListener('click', () => this.close());
    this._popup.addEventListener('click', () => this._handleOvelayClose(event));
    document.addEventListener('keydown', () => this._handleEscClose(event));
    this._form.addEventListener('submit', this._formSubmitHandler);
  }
}