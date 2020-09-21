import { setEscListener } from './index.js';


// Функция открытия модальных окон
export const openPopup = function(popup) {
  popup.classList.add('popup_opened');
  setEscListener();
}