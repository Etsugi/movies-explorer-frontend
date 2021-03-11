import React from 'react';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {

  function handleSubmit(e) {
    e.preventDefault();
  }

  return(
    <form onSubmit={handleSubmit} className="search-form" noValidate>
      <div className="search-form__container">
        <input className="search-form__input" placeholder="Фильм"></input>
        <button className="search-form__button" type="submit">Поиск</button>
      </div>
      <FilterCheckbox />
    </form>
  );
}

export default SearchForm;