import React from 'react';
import { NavLink } from 'react-router-dom';

import ProfileIcon from "../../images/profile_icon.svg";

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function Navigation(props) {
  const user = React.useContext(CurrentUserContext);
  const [isMenuOpen, setMenuOpen] = React.useState(false);

  function MenuOpen() {
    setMenuOpen(!isMenuOpen);
  }

  return(
    <nav className="navigation">
      <div className="navigation__container">
        <NavLink
          to="/movies"
          className="navigation__button"
          activeClassName="navigation__button_active" 
        >
          Фильмы
        </NavLink>
        <NavLink
          to="/saved-movies"
          className="navigation__button"
          activeClassName="navigation__button_active"
        >
          Сохранённые фильмы
        </NavLink>
        <NavLink
          to="/profile"
          className="navigation__button" 
          activeClassName="navigation__button_active" 
        >
          <p className="navigation__button_text">{user.name}</p>
          <img className="navigation__logo-profile" src={`${ProfileIcon}`} alt="Лого профиля" />
        </NavLink>
      </div>
      <button
        onClick={MenuOpen} 
        className={!isMenuOpen ? "navigation__button-menu" : "navigation__button-menu navigation__button-menu_hidden"} 
      >
      </button>
      <div
        className={isMenuOpen ? "navigation__container-mobile navigation__container-mobile_open" : 
        "navigation__container-mobile"}
      >
        <button onClick={MenuOpen} className="navigation__button-menu_close" type="button"></button>
        <NavLink
          exact
          to="/"
          onClick={MenuOpen}
          className="navigation__button-mobile" 
          activeClassName={"navigation__button_active"} 
        >
          Главная
        </NavLink>
        <NavLink
          to="/movies"
          onClick={MenuOpen}
          className="navigation__button-mobile"
          activeClassName="navigation__button_active" 
        >
          Фильмы
        </NavLink>
        <NavLink
          to="/saved-movies"
          onClick={MenuOpen}
          className="navigation__button-mobile"
          activeClassName="navigation__button_active" 
        >
          Сохранённые фильмы
        </NavLink>
        <NavLink
          to="/profile"
          onClick={MenuOpen}
          className="navigation__button-mobile"
          activeClassName="navigation__button_active"
        >
          <p className="navigation__button_text">{user.name}</p>
          <img className="navigation__logo-profile" src={`${ProfileIcon}`} alt="Лого профиля" />
        </NavLink>
      </div>
    </nav>
  );
}

export default Navigation;