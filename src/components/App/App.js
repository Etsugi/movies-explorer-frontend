import React from 'react';
import { Route, Switch, Redirect, useHistory, useRouteMatch } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import Header from "../Header/Header.js";
import Preloader from "../Preloader/Preloader.js";
import Main from "../Main/Main.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Footer from "../Footer/Footer.js";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import Profile from "../Profile/Profile.js";
import NotFound from "../NotFound/NotFound.js";
import InfoTooltip from "../InfoToolTip/InfoTooltip.js";

import MainApi from '../../utils/MainApi';
import MoviesApi from '../../utils/MoviesApi';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function App() {
  const history = useHistory();

  const [token, setToken] = React.useState('');
  const [isPreloader, setPreloader] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState('');
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [initMovie, setInitMovie] = React.useState(false);
  const [initSavedMovie, setInitSavedMovie] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [messageType, setMessageType] = React.useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    checkAuthorize();
  }, []);
  React.useEffect(() => {
    if(loggedIn) {
      setMovies(JSON.parse(localStorage.getItem('movies')));
      setPreloader(false);
    }
  }, [initMovie]);
  React.useEffect(() => {
    if(loggedIn) {
      setSavedMovies(JSON.parse(localStorage.getItem('saved-movies')));
    }
  }, [initSavedMovie]);
  
  function checkAuthorize() {
    const jwt = localStorage.getItem('jwt');
    if (jwt){    
      setToken(jwt);
      MainApi.checkToken(jwt)
      .then(() => {
        checkCurrentUser(jwt);
        setLoggedIn(true);
        if(JSON.parse(localStorage.getItem('movies'))) {
          setInitMovie(true);
          setInitSavedMovie(true);
        };
        history.push('/movies');
      })
      .catch((err) => {
        setMessage(err);
        setInfoTooltipPopupOpen(true);
      });
    } else {
      setLoggedIn(false);
    }
  }

  function checkCurrentUser(jwt) {
    const initialCurrentUser = MainApi.getUserInfo(jwt);
    initialCurrentUser.then((data => {
      const userData = data;
      setCurrentUser(userData);
      })
    )
    .catch((err) => {
      setMessage(err);
      setInfoTooltipPopupOpen(true);
    });
  }

  function clickRegistration(data) {
    const password = data.password;
    MainApi.register(data)
    .then((data) => {
      const user = { 
        email: data.email,
        password: password
      }
      clickLogin(user);
    })
    .catch((err) => {
      setMessage(err);
      setInfoTooltipPopupOpen(true);
    });
  }

  async function clickLogin(data) {
    await MainApi.authorize(data)
    .then((data) => {
      localStorage.setItem('jwt', data.token);
    })
    .then(() => {
      getMovies();
      checkAuthorize();
      history.push("/movies");
    })
    .catch((err) => {
      setMessage(err);
      setInfoTooltipPopupOpen(true);
    })
  }

  function clickLogout() {
    setToken('');
    setInitMovie(false);
    setInitSavedMovie(false);
    setLoggedIn(false);
    localStorage.clear();
    history.push('/');
  }

  function handleEditUser(userData) {
    MainApi.editUser(userData, token)
    .then((userData) => {
      setCurrentUser(userData);
      setMessageType(true);
      setMessage('Изменения сохранены!');
      setInfoTooltipPopupOpen(true);
    })
    .catch((err) => {
      setMessage(err);
      setInfoTooltipPopupOpen(true);
    });
  }

  function getMovies() {
    const jwt = localStorage.getItem('jwt');
    setPreloader(true);
    
    MainApi.getSavedMovies(jwt)
    .then((data) => {
      localStorage.setItem('saved-movies', JSON.stringify(data))
    })
    .then(() => {
      setInitSavedMovie(true);
    })
    .catch((err) => {
      setMessage(err);
      setInfoTooltipPopupOpen(true);
    });

    MoviesApi.getMovies()
    .then((data) => {
      localStorage.setItem('movies', JSON.stringify(data));
    })
    .then(() => {
      setInitMovie(true);
    })
    .catch((err) => {
      setMessage(err);
      setInfoTooltipPopupOpen(true);
    });
 
  }

  function clickSaveMovie(data) {
    MainApi.saveMovie(data, token)
    .then((res) => {
      if(savedMovies.includes(res)) {
      } else {
        localStorage.setItem('saved-movies', JSON.stringify(savedMovies.concat(res)));
        setSavedMovies(JSON.parse(localStorage.getItem('saved-movies')));
      }   
    })
    .catch((err) => {
      setMessage(err);
      setInfoTooltipPopupOpen(true);
    })
  }

  function clickUnsaveMovie(data) {
    MainApi.unSaveMovie(data, token)
    .then((res) => {
      localStorage.setItem('saved-movies', JSON.stringify(savedMovies.filter((item) => item.movieId !== res.movieId)));
      setSavedMovies(JSON.parse(localStorage.getItem('saved-movies')));
    })
    .catch((err) => {
      setMessage(err);
      setInfoTooltipPopupOpen(true);
    })
  }

  function closeAllPopups() {
    setInfoTooltipPopupOpen(false);
    setTimeout(() => {
      setMessage('');
      setMessageType(false);
    }, 300);
  }

  const arrayRoutesExcludeHeader = [
    "/signin",
    "/signup",
    "/404"
  ];
  
  const arrayRoutesExcludeFooter = [
    "/signin",
    "/signup",
    "/profile",
    "404"
  ];

  return (
    <CurrentUserContext.Provider value={currentUser} >
      <div className="app">

      { useRouteMatch(arrayRoutesExcludeHeader) ? null : 
        <Header 
          login={loggedIn}
        /> 
      }

      <Switch>

        <Route exact path="/signup">
          <Register 
            onRegistration={clickRegistration}
          />
        </Route>

        <Route exact path="/signin">
          <Login 
            onLogin={clickLogin}
          />
        </Route>

        <ProtectedRoute
          exact
          path="/profile"
          redirect="/"
          loggedIn={loggedIn}
          component={Profile}
          user={currentUser}
          onLogout={clickLogout}
          onEditUser={handleEditUser}
        />

        <Route exact path="/">
          <Main />
        </Route>

        {isPreloader ? <Preloader /> : 
          <Switch>
            <ProtectedRoute
              exact
              path="/movies"
              redirect="/"
              loggedIn={loggedIn}
              component={Movies}
              movies={movies}
              savedMovies={savedMovies}
              clickSaveMovie={clickSaveMovie}
              clickUnsaveMovie={clickUnsaveMovie}
            />

            <ProtectedRoute
              exact
              path="/saved-movies"
              redirect="/"
              loggedIn={loggedIn}
              component={SavedMovies}
              movies={movies}
              savedMovies={savedMovies}
              clickSaveMovie={clickSaveMovie}
              clickUnsaveMovie={clickUnsaveMovie}
            />
         </Switch>
        }

        <Route path="/404">
          <NotFound />
        </Route>

        <Route path="*">
          <Redirect to="/404" />
        </Route>

      </Switch>

      { useRouteMatch(arrayRoutesExcludeFooter) ? null : 
        <Footer />
      }

      <InfoTooltip
        message={message}
        messageType={messageType}
        isOpen={isInfoTooltipPopupOpen} 
        onClose={closeAllPopups}
      />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
