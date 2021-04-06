import React from 'react';

function Portfolio() {
  return(
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <div className="portfolio__link">
        <h3 className="portfolio__link_name">Статичный сайт</h3>
        <a 
          href="https://etsugi.github.io/how-to-learn/" 
          rel="noreferrer" 
          target="_blank" 
          className="portfolio__link_img"
        >
        </a>
      </div>
      <div className="portfolio__link">
        <h3 className="portfolio__link_name">Адаптивный сайт</h3>
        <a
          href="https://etsugi.github.io/russian-travel"
          rel="noreferrer"
          target="_blank"
          className="portfolio__link_img"
        >
        </a>
      </div>
      <div className="portfolio__link">
        <h3 className="portfolio__link_name">Одностраничное приложение</h3>
        <a
          href="https://kiprin.students.nomoredomains.icu"
          rel="noreferrer" 
          target="_blank" 
          className="portfolio__link_img"
        >
        </a>
      </div>
    </section>
  );
}

export default Portfolio;