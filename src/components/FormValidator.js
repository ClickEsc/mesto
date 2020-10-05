export const formData = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector:'.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorTextClass: 'popup__error-text',
  errorClass: 'popup__error-text_visible'
}

export class FormValidator {

  constructor(formData, formElement) {
    this._formData = formData;
    this._formElement = formElement;

    this._formSelector = formData.formSelector;
    this._inputSelector = formData.inputSelector;
    this._submitButtonSelector = formData.submitButtonSelector;
    this._inactiveButtonClass = formData.inactiveButtonClass;
    this._inputErrorClass = formData.inputErrorClass;
    this._errorTextClass = formData.errorTextClass;
    this._errorClass = formData.errorClass;
  }

  // Приватный метод показа ошибки
  _showErrorMessage = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    this._formElement = formElement;
    this._inputElement = inputElement;
    this._errorMessage = errorMessage;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._formError = this._formElement.querySelector(`#${this._inputElement.id}-error`);
    this._formError.textContent = this._errorMessage;
    this._inputElement.classList.add(this._formData.inputErrorClass);
    this._formError.classList.add(this._formData.errorClass);
  };

  // Приватный метод очистки ошибки
  _hideErrorMessage = (inputElement, inputErrorClass, errorClass) => {
    this._inputElement = inputElement;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._formError = this._formElement.querySelector(`#${this._inputElement.id}-error`);
    this._inputElement.classList.remove(this._formData.inputErrorClass);
    this._formError.classList.remove(this._formData.errorClass);
    this._formError.textContent = '';
  };

  // Приватный метод идентификации ошибки
  _isValid = (inputElement, inputErrorClass, errorClass) => {
    this._inputElement = inputElement;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    if (!this._inputElement.validity.valid) {
      this._showErrorMessage(this._formElement, this._inputElement, this._inputElement.validationMessage, this._inputErrorClass, this._errorClass);
    } else {
      this._hideErrorMessage(this._inputElement, this._inputErrorClass, this._errorClass);
    }
  };
  
  // Приватный метод проверки поля ввода на ошибку
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // Приватный метод изменения состояния кнопки submit в форме
  _toggleButtonState() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    if (this._hasInvalidInput(this._inputList)) {
      this.disableSubmitButton(this._formSubmitButton);
    } else {
      this.enableSubmitButton(this._formSubmitButton);
    }
  }
  
  // Приватный метод установки слушателей
  _setEventListeners = (inputErrorClass, errorClass) => {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._formSubmitButton = this._formElement.querySelector(this._submitButtonSelector);

    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
  
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement, this._inputErrorClass, this._errorClass);
        this._toggleButtonState();
      })
    })
  }
    
  // Публичный метод разблокировки кнопки submit в форме 
  enableSubmitButton = (formSubmitButton) => { 
    this._formSubmitButton = formSubmitButton;
    formSubmitButton.removeAttribute('disabled', ''); 
    formSubmitButton.classList.remove('popup__save_disabled');
  }
  
  // Публичный метод блокировки кнопки submit в форме 
  disableSubmitButton = (formSubmitButton) => { 
    this._formSubmitButton = formSubmitButton;
    this._formSubmitButton.setAttribute('disabled', ''); 
    this._formSubmitButton.classList.add('popup__save_disabled'); 
 }
  
  // Публичный метод валидации формы
  enableValidation = () => {
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    })

    this._setEventListeners();
  }
}