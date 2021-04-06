import React from 'react';

import noImage from '../../images/no-image.jpg';

function MoviesCard(props) {
  const [isSaved, setIsSaved] = React.useState(false);

  React.useEffect(() => {
    setIsSaved(props.savedMovies.some((item) => item.movieId === String(props.movie.id)));
  }, [props.savedMovies]);

  function image() {
    if (props.movie.image) {
      return `https://api.nomoreparties.co${props.movie.image.url}`;
    }
    else {
      return noImage;
    }
  }

  function getTimeFromMinutes() {
    const min = props.movie.duration;
    const hours = Math.trunc(min/60);
    const minutes = min % 60;
    return hours + 'ч ' + minutes + 'м';
};

  function handleSaveClick() {
    if (isSaved) {
      props.clickUnsaveMovie(props.movie.id);
    }
    else {
      props.clickSaveMovie(props.movie);
    }
  }

  return (
    <div className="movies-card">
      <div className="movies-card__container">
        <div className="movies-card__text-container">
          <p className="movies-card__title">{props.movie.nameRU}</p>
          <p className="movies-card__duration">{getTimeFromMinutes()}</p>
        </div>
        <button 
          onClick={handleSaveClick}
          type="button"
          className={`movies-card__save-button ${isSaved ? 'movies-card__save-button_active' : ''}`}
        >
        </button>
      </div>
      <a href={props.movie.trailerLink} rel="noreferrer" target="_blank" className="movies-card__link">
        <img className="movies-card__image" alt={props.movie.nameRU} src={image()} />
      </a>
    </div>
  );
}

export default MoviesCard;