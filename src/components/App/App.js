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

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [initialization, setInitialization] = React.useState(false);

  const [token, setToken] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState('');
  const [movies, setMovies] = React.useState([]); 
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [initMovies, setInitMovies] = React.useState(false);
  const [initSavedMovies, setInitSavedMovies] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [messageType, setMessageType] = React.useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = React.useState(false);

  React.useEffect(() => {
    if (loggedIn === true) {
      if (localStorage.getItem('movies')) {
        setMovies(JSON.parse(localStorage.getItem('movies')));
        setInitMovies(!initMovies);
      }
      if (localStorage.getItem('saved-movies')) {
        setSavedMovies(JSON.parse(localStorage.getItem('saved-movies')));
        setInitSavedMovies(!initSavedMovies);
      }
    } else {
      checkAuthorize();
    }
  }, [loggedIn]);

  React.useEffect(() => {
    setMovies(JSON.parse(localStorage.getItem('movies'))); 
  }, [initMovies]);
  React.useEffect(() => {
    setSavedMovies(JSON.parse(localStorage.getItem('saved-movies')));
  }, [initSavedMovies]);

  
  function checkAuthorize() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {    
      setToken(jwt);
      MainApi.getUserInfo(jwt)
      .then((data) => {
        setCurrentUser(data);
        setLoggedIn(true);
      })
      .catch((err) => {
        setMessage(err);
        setInfoTooltipPopupOpen(true);
      })
      .finally(() => {
        setInitialization(true);
      })
    } else {
      setInitialization(true);
    }
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
    })
    .catch((err) => {
      setMessage(err);
      setInfoTooltipPopupOpen(true);
    })
  }

  function clickLogout() {
    setToken('');
    setInitMovies(false);
    setInitSavedMovies(false);
    setLoggedIn(false);
    localStorage.clear();
    history.push("/");
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
    
    MainApi.getSavedMovies(jwt)
    .then((data) => {
      localStorage.setItem('saved-movies', JSON.stringify(data))
    })
    .then(() => {
      setInitSavedMovies(!initSavedMovies);
    })
    .catch((err) => {
      setMessage(err);
      setInfoTooltipPopupOpen(!initSavedMovies);
    });

    MoviesApi.getMovies()
    .then((data) => {
      localStorage.setItem('movies', JSON.stringify(data));
    })
    .then(() => {
      setInitMovies(!initMovies);
    })
    .catch((err) => {
      setMessage(err);
      setInfoTooltipPopupOpen(true);
    });
  }

  function clickSaveMovie(data) {
    MainApi.saveMovie(data, token)
    .then((res) => {
      if(!savedMovies.includes(res)) {
        localStorage.setItem('saved-movies', JSON.stringify(savedMovies.concat(res)));
        setInitSavedMovies(!initSavedMovies);
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
      setInitSavedMovies(!initSavedMovies);
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

      { useRouteMatch(arrayRoutesExcludeHeader) ? null : 
        <Header 
          loggedIn={loggedIn}
        /> 
      }

      {
        !initialization ? <Preloader /> :
        <>

          <Switch>

            <Route exact path="/">
              <Main />
            </Route>

            <ProtectedRoute
              exact
              path="/movies"
              redirect="/"
              loggedIn={loggedIn}
              component={Movies}
              movies={movies}
              initMovies={initMovies}
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

            <ProtectedRoute
              exact 
              path="/signup"
              redirect="/movies"
              loggedIn={!loggedIn}
              component={Register}
              onRegistration={clickRegistration}
            />

            <ProtectedRoute
              exact 
              path="/signin"
              redirect="/movies"
              loggedIn={!loggedIn}
              component={Login}
              onLogin={clickLogin}
            />

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

            <Route path="/404">
              <NotFound />
            </Route>

            <Route path="*">
              <Redirect to="/404" />
            </Route>

          </Switch>

        </>
      }

      { useRouteMatch(arrayRoutesExcludeFooter) ? null : 
        <Footer />
      }

      <InfoTooltip
        message={message}
        messageType={messageType}
        isOpen={isInfoTooltipPopupOpen} 
        onClose={closeAllPopups}
      />

    </CurrentUserContext.Provider>
  );
}

export default App;
