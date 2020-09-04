// Валидация форм

const isInvalid = function(element) {
  if (!element.validity.valid) {
    return true;
  }
}

// Функция показа ошибки
const showErrorMessage = function(inputElement, inputErrorClass, formError, errorClass) {
  inputElement.classList.add(inputErrorClass);
  formError.classList.add(errorClass);
}

// Функция очистки ошибки
const hideErrorMessage = function(inputElement, inputErrorClass, formError, errorClass) {
  inputElement.classList.remove(inputErrorClass);
  formError.classList.remove(errorClass);
}

// Функция блокировки кнопки submit в форме
const disableSubmitButton = function(formElement, submitButtonSelector, inactiveButtonClass) {
  const formSubmitButton = formElement.querySelector(submitButtonSelector);
  formSubmitButton.setAttribute('disabled', '');
  formSubmitButton.classList.add(inactiveButtonClass);
}

// Функция разблокировки кнопки submit в форме
const enableSubmitButton = function(formElement, submitButtonSelector, inactiveButtonClass) {
  const formSubmitButton = formElement.querySelector(submitButtonSelector);
  formSubmitButton.removeAttribute('disabled', '');
  formSubmitButton.classList.remove(inactiveButtonClass);
}

// Функция setEventListeners
const setEventListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorTextClass, errorClass, ...rest}) => {
  const getInputList = Array.from(formElement.querySelectorAll(inputSelector));

  getInputList.forEach((inputElement) => {
    const formError = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.addEventListener('input', () => {
      if (inputElement.value === '') {
        showErrorMessage(inputElement, inputErrorClass, formError, errorClass);
        formError.textContent = 'Вы пропустили это поле.';
      } else if (inputElement.validity.tooShort) {
        showErrorMessage(inputElement, inputErrorClass, formError, errorClass);
        formError.textContent = 'Минимальное количество символов: 2. Длина текста сейчас: 1 символ.';
      } else if (inputElement.type === 'url' && !inputElement.value.startsWith('http')) {
        showErrorMessage(inputElement, inputErrorClass, formError, errorClass);
        formError.textContent = 'Введите адрес сайта.';
      } else {
        hideErrorMessage(inputElement, inputErrorClass, formError, errorClass);
      }
      
      if (getInputList.some(isInvalid)) {
        disableSubmitButton(formElement, submitButtonSelector, inactiveButtonClass);
      } else {
        enableSubmitButton(formElement, submitButtonSelector, inactiveButtonClass);
      }
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

enableValidation(enableValidation);

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector:'.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorTextClass: 'popup__error-text',
  errorClass: 'popup__error-text_visible'
});