import React from 'react';

const now = new Date().getFullYear();

function Footer(props) {
  return(
    <footer className="footer">
      <h2 className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__container">
        <time-datetime class="footer__copyright">&copy; {now}</time-datetime>
        <div className="footer__button-container">
          <a
            href="https://praktikum.yandex.ru/profile/web/"
            rel="noreferrer"
            target="_blank"
            className="footer__button"
          >
            Яндекс.Практикум
          </a>
          <a
            href="https://github.com"
            rel="noreferrer"
            target="_blank"
            className="footer__button"
          >
            Github
          </a>
          <a
            href="https://www.facebook.com/" 
            rel="noreferrer"
            target="_blank"
            className="footer__button"
          >
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;