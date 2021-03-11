import React from 'react';
import { Link } from "react-scroll";

function NavTab(props) {
  return(
    <div className="navtab">
      <Link to="about-project" smooth={true} duration={500} className="navtab__button">О Проекте</Link>
      <Link to="techs" smooth={true} duration={500} className="navtab__button">Технологии</Link>
      <Link to="about-me" smooth={true} duration={500} className="navtab__button">Студент</Link>
    </div>
  );
}

export default NavTab;