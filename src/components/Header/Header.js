import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';

import Logo from "../../images/logo.svg";

function Header(props) {
  const { path } = useRouteMatch();

  return(
    <header className="header">
      <Link to="/" className="header__logo-container" type="button">
        <img className="header__logo" src={`${Logo}`} alt="Лого" />
      </Link>
      
      {(path != "/" || props.login != false) ?
        <Navigation />
      :
        <div className="header__container">
          <Link to="/signup" className="header__button" type="button">Регистрация</Link>
          <Link to="/signin" className="header__button" type="button">Войти</Link>
        </div>
      }
    </header>
  );
}

export default Header;