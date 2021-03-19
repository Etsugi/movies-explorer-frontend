import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies(props) {
  const [checkbox, setCheckBox] = React.useState(false);

  function clickCheckBox() {
    setCheckBox(!checkbox);
  }

  return(
    <section className="movies">
      <SearchForm 
        clickSearch={props.clickSearch}
        clickCheckBox={clickCheckBox}
      />
      <MoviesCardList 
        movies={props.movies}
        savedMovies={props.savedMovies}
        clickUnsaveMovie={props.clickUnsaveMovie}
        clickSaveMovie={props.clickSaveMovie}
        clickCheckBox={checkbox}
      />
    </section>
  );
}

export default Movies;