import React from 'react';

import MoviesCard from '../MoviesCard/MoviesCard';

import { count, rowCount, shortFilmDuration } from '../../constants/constants';

function MoviesCardList(props) {
  const [move, setMove] = React.useState([]);
  const [currentMovieCount, setCurrentMovieCount] = React.useState(rowCount);
  React.useEffect(() => {
    if(!props.clickCheckBox) {
      setMove(props.movies.filter(movie => movie.duration > shortFilmDuration));
    } else {
      return setMove(props.movies);
    }
  }, [props.clickCheckBox, props.movies]);

  function addMovie() {
    setCurrentMovieCount(currentMovieCount + (count === 1 ? 2 : count));
  }  

  function handleClick() {
    addMovie();
  }

  const movie = {
    nameRu: props.movies.nameRu,
    duration: props.movies.duration,
    image: props.movies.nameRu.image.url || 'нет изображения',
    trailerLink: props.movies.trailerLink,
    id: props.movies.id
  }

  return(
    <section className="movies-card-list">
      <div className="movies-card-list__container">
        {props.savedMovies.slice(0, currentMovieCount).map(movie => 
          <MoviesCard 
            movie={movie}
            savedMovies={props.savedMovies}
            clickSaveMovie={props.clickSaveMovie}
            clickUnsaveMovie={props.clickUnsaveMovie}
            key={movie.id || movie.movieId}
          />
        )}
      </div>
      <button
        onClick={handleClick}
        className={(props.savedMovies.slice(currentMovieCount).length !== 0) ? 
          'movies-card-list__button' : 'movies-card-list__button movies-card-list__button_disabled'} 
        type="button"
      >
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;