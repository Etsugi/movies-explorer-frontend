import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import noImage from '../../images/no-image.jpg';

function MoviesCard(props) {
  const { path } = useRouteMatch();
  const [isSaved, setIsSaved] = React.useState(false);
  const saveButtonClassName = cardSaveButtonClassName();

  React.useEffect(() => {
    setIsSaved(props.savedMovies.some((item) => item.movieId === String(props.movie.id)));
  }, [props.savedMovies]);

  function cardSaveButtonClassName() {
    if(path === "/saved-movies") {
      return 'movies-card__save-button movies-card__save-button_delete';
    }
    else {
      return (`movies-card__save-button ${isSaved ? 'movies-card__save-button_active' : ''}`);
    }
  };

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
      console.log("as")
      props.clickUnsaveMovie(props.movie);
    }
    else {
      props.clickSaveMovie(props.movie);
    }
  }

  return (
    <article className="movies-card">
      <div className="movies-card__container">
        <div className="movies-card__text-container">
          <p className="movies-card__title">{props.movie.nameRU}</p>
          <p className="movies-card__duration">{getTimeFromMinutes()}</p>
        </div>
        <button onClick={handleSaveClick} type="button" className={saveButtonClassName}></button>
      </div>
      <a href={props.movie.trailerLink} className="movies-card__link" target="_blank">
        <img className="movies-card__image" alt={props.movie.nameRU} src={image()} />
      </a>
    </article>
  );
}

export default MoviesCard;