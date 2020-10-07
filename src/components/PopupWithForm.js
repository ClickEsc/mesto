import Popup from './Popup.js';

import { formData } from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._formSubmitHandler = formSubmitHandler;
  }

  _getInputValues = (event) => {
    this._formSubmitHandler(event);
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      this._getInputValues(event);
    });
  }
}