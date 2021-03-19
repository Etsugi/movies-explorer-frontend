import React from 'react';

import noImage from '../../images/no-image.jpg';

function SavedMoviesCard(props) {

  function image() {
    if (props.movie.image) {
      return props.movie.image;
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

  function handleUnSaveClick() {
    props.clickUnsaveMovie(props.movie.movieId);
  }

  return (
    <article className="movies-card">
      <div className="movies-card__container">
        <div className="movies-card__text-container">
          <p className="movies-card__title">{props.movie.nameRU}</p>
          <p className="movies-card__duration">{getTimeFromMinutes()}</p>
        </div>
        <button
          onClick={handleUnSaveClick}
          type="button"
          className='movies-card__save-button movies-card__save-button_delete'
        >
        </button>
      </div>
      <a href={props.movie.trailer} className="movies-card__link" target="_blank">
        <img className="movies-card__image" alt={props.movie.nameRU} src={image()} />
      </a>
    </article>
  );
}

export default SavedMoviesCard;