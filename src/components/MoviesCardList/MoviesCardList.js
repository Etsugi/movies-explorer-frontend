import React from 'react';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {

  function handleClick() {
    props.preloader();
  }

  return(
    <section className="movies-card-list">
      <div className="movies-card-list__container">
        {props.cards.map(card => 
          <MoviesCard 
            card={card}
          />
        )}
      </div>
      <button onClick={handleClick} className="movies-card-list__button" type="button">Ещё</button>
    </section>
  );
}

export default MoviesCardList;