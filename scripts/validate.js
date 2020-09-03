// Валидация форм

const isInvalid = function(element) {
  if (!element.validity.valid) {
    return true;
  }
}

// Функция setEventListeners
const setEventListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorTextClass, errorClass, ...rest}) => {
  const getInputList = Array.from(formElement.querySelectorAll(inputSelector));

  getInputList.forEach((inputElement) => {
    const formError = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.addEventListener('input', () => {
      if (inputElement.value === '') {
        inputElement.classList.add(inputErrorClass);
        formError.classList.add(errorClass);
        formError.textContent = 'Вы пропустили это поле.';
      } else if (inputElement.validity.tooShort) {
        inputElement.classList.add(inputErrorClass);
        formError.classList.add(errorClass);
        formError.textContent = 'Минимальное количество символов: 2. Длина текста сейчас: 1 символ.';
      } else if (inputElement.type === 'url' && !inputElement.value.startsWith('http')) {
        inputElement.classList.add(inputErrorClass);
        formError.classList.add(errorClass);
        formError.textContent = 'Введите адрес сайта.';
      } else {
        inputElement.classList.remove(inputErrorClass);
        formError.classList.remove(errorClass);
      }
      const formSubmitButton = formElement.querySelector(submitButtonSelector);
      if (getInputList.some(isInvalid)) {
        formSubmitButton.setAttribute('disabled', '');
        formSubmitButton.classList.add(inactiveButtonClass);
      } else {
        formSubmitButton.removeAttribute('disabled', '');
        formSubmitButton.classList.remove(inactiveButtonClass);
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

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector:'.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorTextClass: 'popup__error-text',
  errorClass: 'popup__error-text_visible'
});