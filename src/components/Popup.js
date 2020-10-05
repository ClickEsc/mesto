export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  // Добавление слушателя нажатия на Esc
  _setEscListener() {
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Удаление слушателя нажатия на Esc
  _removeEscListener() {
    document.removeEventListener('keydown', this._handleEscClose);
  }
  
  // Закрытие попапа нажатием на Esc
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  // Закрытие попапа нажатием на оверлей
  _handleOvelayClose(event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
  
  // Публичный метод открытия попапа
  open() {
    this._popup.classList.add('popup_opened');
    this._setEscListener();
  }
  
  // Публичный метод закрытия попапа
  close() {
    this._popup.classList.remove('popup_opened');
    this._removeEscListener();
  }
  
  // Публичный метод установки слушателей
  setEventListeners() {
    this._closeButton = this._popup.querySelector('.popup__close');
    this._closeButton.addEventListener('click', () => this.close());
    this._popup.addEventListener('click', () => this._handleOvelayClose(event));
    document.addEventListener('keydown', () => this._handleEscClose(event));
  }
}