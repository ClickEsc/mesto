import Popup from './Popup.js';

import { imageShown, imageShownCaption } from '../utils/constants.js'

export default class PopupWithImage extends Popup {
  open(item) {
    super.open();
    imageShownCaption.textContent = item.name;
    imageShown.setAttribute('src', item.link);
    imageShown.setAttribute('alt', item.alt);
  }
}