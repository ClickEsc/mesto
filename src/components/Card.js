export default class Card {
  constructor({ data, handleCardClick, handleLikeClick, handleDeleteIconClick }, cardTemplate, userId, cardList) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._data.owner._id = data.owner._id;
    this._userId = userId;
    this._cardList = cardList;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
  }

  // Убрать иконку корзины
  _deleteRemoveButtons = () => {
    if (this._data.owner._id !== this._userId) {
      this._removeButton.style.display = 'none';
    }
  }

  // Посчитать количество лайков
  countLikes = (likes) => {
    this._likeButton.classList.toggle('photo-gallery__like-button_clicked');
    this._likeCounter.textContent = likes.length;
  }
   
  // Проверить состояние лайка
  checkLikeState = () => {
    if (this._likeButton.classList.contains('photo-gallery__like-button_clicked')) {
      return true
    } else {
      return false
    }
  }

  _setEventListeners = () => {
    this._removeButton.addEventListener('click', (event) => {
      event.preventDefault()
      this._handleDeleteIconClick(this._data);
    });

    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._data);
    })

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._data);
    })
  }

  // Удаление карточки
  deleteCardElement() {
    this._view.remove();
    this._view = null;
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

    this._deleteRemoveButtons();
    this._setEventListeners();

    return this._view;
  }
}