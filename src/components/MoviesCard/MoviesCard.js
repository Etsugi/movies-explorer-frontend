import React from 'react';
import { useRouteMatch } from 'react-router-dom';

function MoviesCard(props) {
  const { path } = useRouteMatch();
  const [isSaved, setSaved] = React.useState(props.card.save); //заготовка на будущее
  const saveButtonClassName = cardSaveButtonClassName();
  function cardSaveButtonClassName() {
    if(path === "/saved-movies") {
      return 'movies-card__save-button movies-card__save-button_delete';
    }
    else {
      return (`movies-card__save-button ${isSaved ? 'movies-card__save-button_active' : ''}`);
    }
  };

  function handleSaveClick() {
    setSaved(!isSaved);
    props.card.save = isSaved;
  }

  return (
    <article className="movies-card">
      <div className="movies-card__container">
        <div className="movies-card__text-container">
          <p className="movies-card__title">{props.card.title}</p>
          <p className="movies-card__duration">{props.card.duration}</p>
        </div>
        <button onClick={handleSaveClick} type="button" className={saveButtonClassName}></button>
      </div>
      <img className="movies-card__image" alt={props.card.title} src={props.card.link} />
    </article>
  );
}

export default MoviesCard;