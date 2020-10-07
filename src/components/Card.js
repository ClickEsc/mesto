export default class Card {
  constructor(name, link, cardTemplate, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardTemplate = document.querySelector(cardTemplate).content;
    this._handleCardClick = handleCardClick;
  }

  // Удаление карточки
  _delCardClickHandler = () => {
    this._view.remove();
    this._view = null;
  }
  
  // Проставление лайков
  _likeCardClickHandler = (event) => {
    this._likeButton.classList.toggle('photo-gallery__like-button_clicked');
  }

  _setEventListeners = () => {
    this._view.querySelector('.photo-gallery__remove-button').addEventListener('click', this._delCardClickHandler);
    this._likeButton.addEventListener('click', this._likeCardClickHandler);
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this);
    });
  }
  
  // Создание карточки
  createCard = () => {
    this._view = this._cardTemplate.cloneNode(true).querySelector('.photo-gallery__item');

    this._cardImage = this._view.querySelector('.photo-gallery__image');
    this._likeButton = this._view.querySelector('.photo-gallery__like-button');

    this._view.querySelector('.photo-gallery__heading').textContent = this._name;
    this._cardImage.setAttribute('src', this._link);
    this._cardImage.setAttribute('alt', 'Фотография из места под названием' + ' ' + this._name);

    this._setEventListeners();

    return this._view;
  }
}