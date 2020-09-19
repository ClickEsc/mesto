import { openPopup } from './utils.js'
import { showImagePopup, imageShown, imageShownCaption } from './utils.js'

export class Card {

  static _template = document.querySelector('#cardTemplate').content;
  
  constructor(name, link, alt, isLiked) {
    this._name = name;
    this._link = link;
    this._alt = alt;
    this._isLiked = isLiked;
  }

  // Удаление карточки
  _delCardClickHandler = () => {
    this._view.remove();
  }
  
  // Проставление лайков
  _likeCardClickHandler = (event) => {
    event.target.closest('.photo-gallery__like-button').classList.toggle('photo-gallery__like-button_clicked');
    this._isLiked = !this._isLiked;
    console.log(this._isLiked);
  }

  // Просмотр фотографий
  _showImageClickHandler = () => {
    imageShown.src = this._link;
    imageShown.alt = this._alt;
    imageShownCaption.textContent = this._name;
  }
  
  render = (initialCardsContainer) => {
    this._view = Card._template.cloneNode(true).children[0];
    this._view.querySelector('.photo-gallery__heading').textContent = this._name;
    //console.log(this._name);
    this._view.querySelector('.photo-gallery__image').setAttribute('src', this._link);
    //console.log(this._link);
    this._view.querySelector('.photo-gallery__image').setAttribute('alt', this._alt);
    //console.log(this._alt);

    this._view.querySelector('.photo-gallery__remove-button').addEventListener('click', this._delCardClickHandler);
    this._view.querySelector('.photo-gallery__like-button').addEventListener('click', this._likeCardClickHandler);
    this._view.querySelector('.photo-gallery__image').addEventListener('click', this._showImageClickHandler);
    this._view.querySelector('.photo-gallery__image').addEventListener('click', () => openPopup(showImagePopup));

    // Просмотр фотографий
    
    initialCardsContainer.prepend(this._view);
  }
}

