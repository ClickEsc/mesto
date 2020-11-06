export default class UserInfo {
  constructor(profileInfo) {
    this._username = document.querySelector(profileInfo.username);
    this._bio = document.querySelector(profileInfo.bio);
    this._avatar = document.querySelector(profileInfo.avatar);
  }

  getUserInfo() {
    const newProfileInfo = {
      username: this._username.textContent,
      bio: this._bio.textContent,
    };

    return newProfileInfo;
  }

  setUserInfo({ username, bio }) {
    this._username.textContent = username;
    this._bio.textContent = bio;
  }

  setUserAvatar({ avatar }) {
    this._avatar.src = avatar;
  }
}