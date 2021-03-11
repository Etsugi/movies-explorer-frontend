import React from 'react';

function FilterCheckbox(props) {

  function handleClick(e) {
    e.preventDefault();
  }

  return(
    <div className="filter-checkbox">
      <input id="checkbox" className="filter-checkbox__input" type="checkbox"></input>
      <label for="checkbox" className="filter-checkbox__text">Короткометражки</label>
    </div>
  );
}

export default FilterCheckbox;