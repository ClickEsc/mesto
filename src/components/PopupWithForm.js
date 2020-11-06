import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { formSubmitHandler }) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._formSubmitHandler = formSubmitHandler;
  }

  _getInputValues = () => {
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._inputValues = {};
    this._inputList.forEach(input => this._inputValues[input.name] = input.value);
    return this._inputValues;
  }

  close = () => {
    super.close();
    this._form.reset();
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      this._formSubmitHandler(this._getInputValues());
    })
  }
}