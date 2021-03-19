import React from 'react';

import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";

function Main() {
  return(
    <main className="main">
      <Promo />
      <AboutProject id="about-project" />
      <Techs id="techs" />
      <AboutMe id="about-me" />
    </main>
  );
}

export default Main;