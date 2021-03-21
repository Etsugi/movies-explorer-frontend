import React from 'react';

import Preloader from "../Preloader/Preloader.js";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies(props) {
  const [isPreloader, setPreloader] = React.useState(true);
  const [movies, setMovies] = React.useState([]);
  const [checkbox, setCheckBox] = React.useState(false);

  React.useEffect(() => {
    if (props.movies !== null) {
      setPreloader(false);
      setMovies(props.movies);
    }
  }, [props.movies]);

  function clickSearch(data) {
    setMovies(JSON.parse(localStorage.getItem('movies')).filter(movie => 
      movie.nameRU.toUpperCase().indexOf(data.toUpperCase()) > -1));
  }

  function clickCheckBox() {
    setCheckBox(!checkbox);
  }

  return(
    <main className="movies">
      <SearchForm 
        clickSearch={clickSearch}
        clickCheckBox={clickCheckBox}
      />
      { isPreloader ? <Preloader /> 
        : <>{ movies.length === 0 ? <p className="movies__not-found">Ничего не найдено</p> 
            : <MoviesCardList 
                movies={movies}
                savedMovies={props.savedMovies}
                clickUnsaveMovie={props.clickUnsaveMovie}
                clickSaveMovie={props.clickSaveMovie}
                clickCheckBox={checkbox}
              />
          }</>
      }
    </main>
  );
}

export default Movies;