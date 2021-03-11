import React from 'react';


function AboutProject(props) {
  return(
    <section className="about-project" >
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__container">
        <div className="about-project__column">
          <h3 className="about-project__column_title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__column_text"> 
            Составление плана, работу над бэкендом, вёрстку, 
            добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__column">
          <h3 className="about-project__column_title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__column_text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые 
            нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
        <div className="about-project__progress-bar">
          <div className="about-project__progress-bar_item">
            <p className="about-project__progress-bar_item_text about-project__progress-bar_item_text_back">1 неделя</p>
            <h4 className="about-project__progress-bar_item_title">Back-end</h4>
          </div>
          <div className="about-project__progress-bar_item">
            <p className="about-project__progress-bar_item_text about-project__progress-bar_item_text_front">4 недели</p>
            <h4 className="about-project__progress-bar_item_title">Front-end</h4>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;