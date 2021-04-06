import React from 'react';

function FilterCheckbox(props) {

  function handleClick(e) {
    e.preventDefault();
    props.clickCheckBox();
  }

  return(
    <div className="filter-checkbox">
      <input onInput={handleClick} id="checkbox" className="filter-checkbox__input" type="checkbox"></input>
      <label htmlFor="checkbox" className="filter-checkbox__text">Короткометражки</label>
    </div>
  );
}

export default FilterCheckbox;