import React from 'react';

import NavTab from "../NavTab/NavTab";

function Promo(props) {
  return(
    <section className="promo">
      <h2 className="promo__text">Учебный проект студента факультета Веб-разработки.</h2>
      <NavTab />
    </section>
  );
}

export default Promo;