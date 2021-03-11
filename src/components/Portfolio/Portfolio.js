import React from 'react';

function Portfolio(props) {
  return(
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <div className="portfolio__link">
        <h3 className="portfolio__link_name">Статичный сайт</h3>
        <a href="https://github.com/Etsugi" className="portfolio__link_img" target="_blank"></a>
      </div>
      <div className="portfolio__link">
        <h3 className="portfolio__link_name">Адаптивный сайт</h3>
        <a href="https://github.com/Etsugi" className="portfolio__link_img" target="_blank"></a>
      </div>
      <div className="portfolio__link">
        <h3 className="portfolio__link_name">Одностраничное приложение</h3>
        <a href="https://github.com/Etsugi" className="portfolio__link_img" target="_blank"></a>
      </div>
    </section>
  );
}

export default Portfolio;