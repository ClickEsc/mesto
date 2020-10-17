import { api } from '../pages/index.js';

export default class Card {
  constructor({ data, handleCardClick, handleLikeClick, handleDeleteIconClick }, cardTemplate) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    /*this._owner._id = data.owner._id;*/
    /*console.log (data.owner_id);*/
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
  }

  // Приватный метод для наложения нужных классов на иконку лайка
  // 1. Вызывается при создании карточки и при обновлении лайков
  // ....................
  // убрать для чужой карточки


  // Убрать иконку корзины
  deleteRemoveButtons = () => {
    this._removeButton.style.display = 'none';
  }

  _setEventListeners = () => {
    this._removeButton.addEventListener('click', () => {
      this._handleDeleteIconClick(this._data);
    });
    this._likeButton.addEventListener('click', () => {
      this._likeButton.classList.toggle('photo-gallery__like-button_clicked');
      this._handleLikeClick();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._data);
    })
  }

  // Создание карточки
  createCard = () => {
    this._view = document.querySelector(this._cardTemplate).content.cloneNode(true).querySelector('.photo-gallery__item');

    this._cardImage = this._view.querySelector('.photo-gallery__image');
    this._likeButton = this._view.querySelector('.photo-gallery__like-button');
    this._removeButton = this._view.querySelector('.photo-gallery__remove-button');
    this._likeCounter = this._view.querySelector('.photo-gallery__like-counter');

    this._view.querySelector('.photo-gallery__heading').textContent = this._name;
    this._cardImage.setAttribute('src', this._link);
    this._cardImage.setAttribute('alt', 'Фотография из места под названием' + ' ' + this._name);
    this._likeCounter.textContent = this._likes.length;

    this._setEventListeners();

    return this._view;
  }
}