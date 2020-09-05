// Валидация форм

// Функция идентификации ошибки
const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showErrorMessage(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideErrorMessage(formElement, inputElement, inputErrorClass, errorClass);
  }
};

// Функция показа ошибки
const showErrorMessage = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const formError = formElement.querySelector(`#${inputElement.id}-error`);
  formError.textContent = errorMessage;
  inputElement.classList.add(inputErrorClass);
  formError.classList.add(errorClass);
};

// Функция очистки ошибки
const hideErrorMessage = (formElement, inputElement, inputErrorClass, errorClass) => {
  const formError = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  formError.classList.remove(errorClass);
  formError.textContent = '';
};

// Функция проверки поля ввода на ошибку
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Функция блокировки кнопки submit в форме 
const disableSubmitButton = function(formSubmitButton) { 
  formSubmitButton.setAttribute('disabled', ''); 
  formSubmitButton.classList.add('popup__save_disabled'); 
}

// Функция разблокировки кнопки submit в форме 
const enableSubmitButton = function(formSubmitButton) { 
  formSubmitButton.removeAttribute('disabled', ''); 
  formSubmitButton.classList.remove('popup__save_disabled');
}

// Функция изменения состояния кнопки submit в форме
function toggleButtonState(formSubmitButton, formElement, inputSelector) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(formSubmitButton);
  } else {
    enableSubmitButton(formSubmitButton);
  }
}

// Функция setEventListeners
const setEventListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorTextClass, errorClass, ...rest}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const formSubmitButton = formElement.querySelector(submitButtonSelector);

  toggleButtonState(formSubmitButton, formElement, inputSelector, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(formSubmitButton, formElement, inputSelector, inactiveButtonClass);
    })
  })
}

// Функция enableValidation
const enableValidation = ({formSelector, ...rest}) => {
  const getFormList = Array.from(document.querySelectorAll(formSelector));

  getFormList.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    })

    setEventListeners(formElement, rest);
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector:'.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorTextClass: 'popup__error-text',
  errorClass: 'popup__error-text_visible'
});