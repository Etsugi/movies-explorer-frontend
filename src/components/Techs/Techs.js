import React from 'react';


function Techs(props) {
  return(
    <section className="techs">
      <h2 className="techs__title">Технологии</h2>
      <div className="techs__container">
        <h3 className="techs__container_title">7 технологий</h3>
        <p className="techs__container_text">На курсе веб-разработки мы освоили технологии, 
          которые применили в дипломном проекте.
        </p>
        <ul className="techs__card-container">
          <li className="techs__card">HTML</li>
          <li className="techs__card">CSS</li>
          <li className="techs__card">JS</li>
          <li className="techs__card">React</li>
          <li className="techs__card">Git</li>
          <li className="techs__card">Express.js</li>
          <li className="techs__card">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;