import React from 'react';

import Portfolio from "../Portfolio/Portfolio";

import Profile from "../../images/profile.jpg";

function AboutMe(props) {
  return(
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__info_name">Константин</h3>
          <p className="about-me__info_profession">Фронтенд-разработчик, 23 года</p>
          <p className="about-me__info_description">Я родился в Кемерово, учился на математическом факультете КемГУ. 
            Жены и детей нет. Люблю посидеть дома, смотреть какие-нибудь фильмы, сериалы, либо играть. Недавно начал кодить.
            В 2020 году начал курс по веб-разработке, планируя после его окончания уйти с текущей работы в Front-end 
            разработку.
          </p>
          <div className="about-me__container-link">
            <a 
              href="https://www.facebook.com/"
              rel="noreferrer"
              className="about-me__link"
              target="_blank"
            >
              Facebook
            </a>
            <a
              href="https://github.com/Etsugi"
              rel="noreferrer"
              className="about-me__link"
              target="_blank"
            >
              Github
            </a>
          </div>
        </div>
        <img className="about-me__photo" src={Profile} alt="Фото"/>
      </div>
      <Portfolio />
    </section>
  );
}

export default AboutMe;