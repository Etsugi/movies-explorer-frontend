import React from 'react';

import SavedMoviesCard from '../SavedMoviesCard/SavedMoviesCard';

import { count, rowCount, ShortFilmDuration } from '../../constants/constants';

function MoviesCardList(props) {
  const [movies, setMovies] = React.useState([]);
  const [currentMovieCount, setCurrentMovieCount] = React.useState(rowCount);
  React.useEffect(() => {
    if(!props.clickCheckBox) {
      setMovies(props.savedMovies.filter(movie => movie.duration > ShortFilmDuration));
    } else {
      return setMovies(props.savedMovies);
    }
  }, [props.clickCheckBox, props.savedMovies]);

  function addMovie() {
    setCurrentMovieCount(currentMovieCount + (count === 1 ? 2 : count));
  }  

  function handleClick() {
    addMovie();
  }

  return(
    <>
      { movies.length === 0 ? <p className="movies__not-found">Ничего не найдено</p> 
        : 
          <div className="movies-card-list">
          <div className="movies-card-list__container">
            {movies.slice(0, currentMovieCount).map(movie => 
              <SavedMoviesCard 
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
          </div>
      }
    </>
  );
}

export default MoviesCardList;