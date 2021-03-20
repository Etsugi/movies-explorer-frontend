import React from 'react';

function Portfolio() {
  return(
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <div className="portfolio__link">
        <h3 className="portfolio__link_name">Статичный сайт</h3>
        <a href="https://github.com/Etsugi" rel="noreferrer" target="_blank" className="portfolio__link_img"></a>
      </div>
      <div className="portfolio__link">
        <h3 className="portfolio__link_name">Адаптивный сайт</h3>
        <a href="https://github.com/Etsugi" rel="noreferrer" target="_blank" className="portfolio__link_img"></a>
      </div>
      <div className="portfolio__link">
        <h3 className="portfolio__link_name">Одностраничное приложение</h3>
        <a href="https://github.com/Etsugi" rel="noreferrer" target="_blank" className="portfolio__link_img"></a>
      </div>
    </section>
  );
}

export default Portfolio;