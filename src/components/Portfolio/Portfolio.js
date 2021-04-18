import React from 'react';

import PortfolioItem from '../PortfolioItem/PortfolioItem';

import { portfolio } from '../../constants/portfolio';

function Portfolio() {
  return(
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      {portfolio.slice(0).map(item =>
        <PortfolioItem 
          item={item}
          key={item.id}
        />
      )}
    </section>
  );
}

export default Portfolio;