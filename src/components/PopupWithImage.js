import Popup from './Popup.js';

import { imageShown, imageShownCaption } from '../utils/constants.js'

export default class PopupWithImage extends Popup {
  open(item) {
    super.open();
    imageShownCaption.textContent = item._name;
    imageShown.setAttribute('src', item._link);
    imageShown.setAttribute('alt', item._alt);
  }
}