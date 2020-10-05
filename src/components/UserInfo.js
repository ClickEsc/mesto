export default class UserInfo {
  constructor(profileInfo) {
    this._username = document.querySelector(profileInfo.username);
    this._bio = document.querySelector(profileInfo.bio);
    this._nameInput = document.querySelector('.popup__username');
    this._bioInput = document.querySelector('.popup__bio');
  }

  getUserInfo() {
    this._nameInput.value = this._username.textContent;
    this._bioInput.value = this._bio.textContent;
  }

  setUserInfo() {
    this._username.textContent = this._nameInput.value;
    this._bio.textContent = this._bioInput.value;
  }
}