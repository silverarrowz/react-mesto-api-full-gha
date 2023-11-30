class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }  

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`
      }
    })
    .then(res => this._checkResponse(res));
  }

  editProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(res => this._checkResponse(res));
  }
  
  updateAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH', 
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ avatar: link })
    })
    .then(res => this._checkResponse(res));
  }
  
  getCardsData(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`
      }
    })
    .then(res => this._checkResponse(res));
  }
  
  createCard(inputData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: inputData.name,
        link: inputData.link
      })
    })
    .then(res => this._checkResponse(res));
  }

  deleteCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
    .then(res => this._checkResponse(res));
  }

  changeLikeStatus(_id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => this._checkResponse(res));
  }
}

const api = new Api({
  baseUrl: 'http://localhost:4000',
  headers: {
  'Content-type': 'application/json',
  }
});

export default api;