import React from 'react';

import MoviesCard from '../MoviesCard/MoviesCard';

import { count, rowCount, ShortFilmDuration } from '../../constants/constants';

function MoviesCardList(props) {
  console.log(count);
  const [movies, setMovies] = React.useState([]);
  const [currentMovieCount, setCurrentMovieCount] = React.useState(rowCount);
  React.useEffect(() => {
    if(!props.clickCheckBox) {
      setMovies(props.movies.filter(movie => movie.duration > ShortFilmDuration));
    } else {
      return setMovies(props.movies);
    }
  }, [props.clickCheckBox, props.movies]);

  function addMovie() {
    setCurrentMovieCount(currentMovieCount + (count === 1 ? 2 : count));
  }  

  function handleClick() {
    addMovie();
  }

  return(
    <div className="movies-card-list">
      <div className="movies-card-list__container">
        {movies.slice(0, currentMovieCount).map(movie => 
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
        className={(movies.slice(currentMovieCount).length !== 0) ? 
          'movies-card-list__button' : 'movies-card-list__button movies-card-list__button_disabled'} 
        type="button"
      >
        Ещё
      </button>
    </div>
  );
}

export default MoviesCardList;