import React from 'react';

function PortfolioItem(props) {
  const [isOpen, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(!isOpen);
  } 

  return(
    <section className={isOpen === false ? "portfolio-item" : "portfolio-item portfolio-item_open"}>
      <button className="portfolio-item__button" type="button" onClick={handleClick}>
        <h3 className="portfolio-item__button_title">{props.item.title}</h3>
        <span className={isOpen === false ? "portfolio-item__button_img" : "portfolio-item__button_img portfolio-item__button_img-rotate"}/>
      </button>
      <div className="portfolio-item__container">
        <a
          className="portfolio-item__link-preview"
          href={props.item.link}
          rel="noreferrer"
          target="_blank"
        >
          <img className="portfolio-item__preview" src={props.item.img} alt={`Превью сайта ${props.item.title}`}/>
        </a>
        <div className="portfolio-item__text-container">
          <h3 className="portfolio-item__title">{props.item.title}</h3>
          <p className="portfolio-item__description">{props.item.description}</p>
          <a 
            className="portfolio-item__link"
            href={props.item.link}
            rel="noreferrer"
            target="_blank"
          >
            Ссылка на сайт
          </a>
          <a 
            className="portfolio-item__link"
            href={props.item.gitLink}
            rel="noreferrer"
            target="_blank"
          >
            Репозиторий на Github
          </a>
        </div>
      </div>
    </section>
  );
}

export default PortfolioItem;