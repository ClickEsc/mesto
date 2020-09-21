import { openPopup } from './utils.js'
import { showImagePopup, imageShown, imageShownCaption } from './constants.js'

export class Card {

  constructor(name, link, alt, isLiked, cardTemplate) {
    this._name = name;
    this._link = link;
    this._alt = alt;
    this._isLiked = isLiked;
    this._cardTemplate = document.querySelector(cardTemplate).content;
  }

  // Удаление карточки
  _delCardClickHandler = () => {
    this._view.remove();
  }
  
  // Проставление лайков
  _likeCardClickHandler = (event) => {
    this._likeButton.classList.toggle('photo-gallery__like-button_clicked');
    this._isLiked = !this._isLiked;
  }

  // Просмотр фотографий
  _showImageClickHandler = () => {
    imageShown.src = this._link;
    imageShown.alt = this._alt;
    imageShownCaption.textContent = this._name;
  }
  
  createCard = () => {
    this._view = this._cardTemplate.cloneNode(true).children[0];

    this._cardImage = this._view.querySelector('.photo-gallery__image');
    this._likeButton = this._view.querySelector('.photo-gallery__like-button');

    this._view.querySelector('.photo-gallery__heading').textContent = this._name;
    this._cardImage.setAttribute('src', this._link);
    this._cardImage.setAttribute('alt', this._alt);

    this._view.querySelector('.photo-gallery__remove-button').addEventListener('click', this._delCardClickHandler);
    this._likeButton.addEventListener('click', this._likeCardClickHandler);
    this._cardImage.addEventListener('click', this._showImageClickHandler);
    this._cardImage.addEventListener('click', () => openPopup(showImagePopup));

    return this._view;
  }
}

