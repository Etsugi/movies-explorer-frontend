const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

async function getMovies() {
  return await fetch(`${BASE_URL}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then((res) => {
    return resHandler(res);
  })
}

function resHandler(res) {
  if (res.ok) {
    return res.json();
  }
  return res.status;
}

export default {
  getMovies
}

/*body: JSON.stringify({
  nameRU: data.nameRu,
  nameEN: data.nameEN,
  director: data.director,
  country: data.country,
  year: data.year,
  duration: data.duration,
  description: data.description,
  trailer: data.trailerLink,
  image: data.image, 
  thumbnail: data.thumbnail
})*/