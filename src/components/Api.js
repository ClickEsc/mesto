export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }
  
  // Показать ошибку в консоли
  _showError(res) {
    if (res.ok) {
      return res.json();
    }
      console.log(res);
      return Promise.reject(`Что-то пошло не так. Текст ошибки: ${res.status}`)
  }

  // Получить список всех карточек в виде массива
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: this.headers
    })
    
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Что-то пошло не так. Текст ошибки: ${res.status}`)
      }
    });
  }

  // Добавить карточку
  postCard({name, link}) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => this._showError(res))
      .then((res) => {
        this.name = res.name;
        this.link = res.link;
      })
  }

  // Удалить карточку
  deleteCard(card) {
    return fetch(`${this.baseUrl}/cards/${card._id}`, {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify({
        _id: card._id,
        owner: {
          _id: card.owner._id
        }
      })
    })
      
      .then((res) => {
        this.card = card;
        console.log(res.status);
        if (this.card.owner._id === res.owner._id) {
          return res.json();
        }
      })
  }

  // Получить данные пользователя
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this.headers
    })
      .then(res => this._showError(res))
  }

  // Заменить данные пользователя
  editUserInfo({name, about}) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then((res) => {
        this._showError(res)
      })
      .then((res) => {
        this.name = res.name;
        this.about = res.about;
      })
  }

  // Заменить аватар
  changeUserAvatar(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then((res) => {
        this._showError(res);
      })
      .then((res) => {
        this.link = res;
      })
  }

  // Лайкнуть карточку
  putLike(card) {
    return fetch(`${this.baseUrl}/cards/like/${card._id}`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify({
        likes: card.likes
      })
    })
      .then((res) => {
        this._showError(res);
      })
      .then((res) => {
        this.likes.length = res + 1;
      })
  }

  // Убрать лайк карточки
  deleteLike(card) {
    return fetch(`${this.baseUrl}/cards/like/${card._id}`, {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify({
        likes: card.likes
      })
    })
      .then((res) => {
        this._showError(res);
      })
      .then((res) => {
        this.likes.length = res - 1;
      })
  }
}