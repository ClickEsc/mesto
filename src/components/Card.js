import { api } from "../pages";

export default class Card {
  constructor({ data, handleCardClick, handleLikeClick, handleDeleteIconClick }, cardTemplate) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._data.owner._id = data.owner._id;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
  }

  // Убрать иконку корзины
  deleteRemoveButtons = () => {
    if (this._data.owner._id !== '6937c4952c5ef72e3d6f90c9') {
      this._removeButton.style.display = 'none';
    }
  }

  _setEventListeners = () => {
    this._removeButton.addEventListener('click', () => {
      this._handleDeleteIconClick.bind(this._data);
      /*this._view.remove();
      this._view = null;*/
    });
    this._likeButton.addEventListener('click', () => {
      this._likeButton.classList.toggle('photo-gallery__like-button_clicked');
      api.putLike(this._data)
         .then((res) => {
           if (this._data.owner._id !== '6937c4952c5ef72e3d6f90c9') {
            api.deleteLike(this._data)
            .then ((res) => {
              res.likes.length -= 1;
              this._likeCounter.textContent = res.likes.length
            })
           }
          res.likes.length += 1;
          this._likeCounter.textContent = res.likes.length
         })
         .catch((err) => {
           console.log(err)
         })
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

    this.deleteRemoveButtons();
    this._setEventListeners();

    return this._view;
  }
}