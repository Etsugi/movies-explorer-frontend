import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies(props) {
  const [isPreloader, setPreloader] = React.useState(false);

  function handlePreloader() {
    setPreloader(!isPreloader);
  }

  return(
    <section className="movies">
      <SearchForm />
      <MoviesCardList 
        cards={props.cards}
        preloader={handlePreloader}
      />
      {isPreloader ? 
        <Preloader /> : ''
      }
    </section>
  );
}

export default Movies;