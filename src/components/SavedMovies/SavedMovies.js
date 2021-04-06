import React from 'react';

import Preloader from "../Preloader/Preloader.js";
import SearchForm from '../SearchForm/SearchForm';
import SavedMoviesCardList from '../SavedMoviesCardList/SavedMoviesCardList';

function SavedMovies(props) {
  const [isPreloader, setPreloader] = React.useState(true);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [checkbox, setCheckBox] = React.useState(false);
  React.useEffect(() => {
    if (props.savedMovies !== null) {
      setSavedMovies(props.savedMovies);
    } 
  }, [props.savedMovies]);
  React.useEffect(() => {
    setPreloader(false);
  }, [savedMovies]);

  function clickCheckBox() {
    setCheckBox(!checkbox);
  }

  function clickSearch(data) {
    setSavedMovies(JSON.parse(localStorage.getItem('saved-movies')).filter(movie => 
      movie.nameRU.toUpperCase().indexOf(data.toUpperCase()) > -1));
  }

  return(
    <main className="movies">
      <SearchForm 
        clickSearch={clickSearch}
        clickCheckBox={clickCheckBox}
      />
      { isPreloader ? <Preloader /> 
        : <SavedMoviesCardList 
            savedMovies={savedMovies}
            clickSaveMovie={props.clickSaveMovie}
            clickUnsaveMovie={props.clickUnsaveMovie}
            clickCheckBox={checkbox}
          />
      }
    </main>
  );
}

export default SavedMovies;