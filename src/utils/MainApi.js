const BASE_URL = 'https://api.diplom.kiprin.students.nomoredomains.icu';

async function register(data) {
  return await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email, 
      password: data.password
    })
  })
  .then((res) => {
    return resHandler(res);
  })
}; 

async function authorize(data) {
  return await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: data.email, 
      password: data.password
    })
  })
  .then((res) => {
    return resHandler(res);
  })
}; 

/*async function checkToken(token) {
  return await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
    }
  })
  .then((res) => {
    return resHandler(res);
  })
}*/

async function getUserInfo(token) {
  return await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
    },
  }).then((res) => {
    return resHandler(res);
  })
}

async function editUser(data, token) {
  return await fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email
    })
  }).then((res) => {
    return resHandler(res);
  })
}

async function getSavedMovies(token) {
  return await fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
    }
  })
  .then((res) => {
    return resHandler(res);
  })
}

async function saveMovie(data, token) {
  return await fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
    },
    body: JSON.stringify({
      country: data.country || 'Не указано',
      director: data.director || 'Не указано',
      duration: data.duration || 'Не указано',
      year: data.year || 'Не указано',
      description: data.description || 'Не указано',
      image: `https://api.nomoreparties.co${data.image.url}` || 'Не указано',
      trailer: data.trailerLink || 'Не указано',
      thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}` || 'Не указано',
      nameRU: data.nameRU || 'Не указано',
      nameEN: data.nameEN || 'Не указано',
      movieId: data.id || 'Не указано'
    })
  })
  .then((res) => {
    return resHandler(res);
  })
}

async function unSaveMovie(data, token) {
  return fetch(`${BASE_URL}/movies/${data}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
    },
  })
  .then((res) => {
    return resHandler(res);
  })
}

function resHandler(res) {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => { throw err.message });
};

export default {
  register,
  authorize,
  getUserInfo,
  editUser,
  getSavedMovies,
  saveMovie,
  unSaveMovie
}