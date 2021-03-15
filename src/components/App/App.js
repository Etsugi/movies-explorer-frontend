import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Movies from "../Movies/Movies.js";
import Footer from "../Footer/Footer.js";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import Profile from "../Profile/Profile.js";
import NotFound from "../NotFound/NotFound.js";

function App() {

  const [isLogin, setLogin] = React.useState(true);

  const [isUser, setUser] = React.useState({
    name: "Константин",
    email: "kiprin.konstantin@yandex.ru"
  });

  const [cards, setCards] = React.useState([
    {
      title: "33 слова о дизайне",
      duration: "1:47",
      link: "../../images/test-picture.jpg",
      save: false
    },
    {
      title: "33 слова о дизайне",
      duration: "1:47",
      link: "../../images/test-picture.jpg",
      save: true
    },
    {
      title: "33 слова о дизайне",
      duration: "1:47",
      link: "../../images/test-picture.jpg",
      save: false
    },
    {
      title: "33 слова о дизайне",
      duration: "1:47",
      link: "../../images/test-picture.jpg",
      save: false
    }
  ]);

  return (
    <div className="app">

      <Switch>

        <Route path="/signup">
          <Register />
        </Route>

        <Route path="/signin">
          <Login />
        </Route>

        <Route path="/profile">
          <Header 
            login={isLogin}
          />
          <Profile 
            user={isUser}
          />
        </Route>

        <Route exact path="/" redirect="/main">
          <Header 
            login={isLogin}
          />
          <Main />
          <Footer />
        </Route>

        <Route path="/movies">
          <Header 
            login={isLogin}
          />
          <Movies 
            cards={cards}
          />
          <Footer />
        </Route>

        <Route path="/saved-movies">
          <Header 
            login={isLogin}
          />
          <Movies 
            cards={cards}
          />
          <Footer />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>

      </Switch>

    </div>
  );
}

export default App;
