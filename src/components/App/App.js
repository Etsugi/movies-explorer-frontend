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

import MainApi from '../../utils/MainApi';
import MoviesApi from '../../utils/MoviesApi';

import {
  InternalServerErrMess,
  badRequestErrMess,
  conflictUserReqErrMess,
  conflictMovieReqErrMess,
  forbiddenErrMess,
  urlNotFoundErrMess,
  movieNotFoundErrMess,
  authorizedFailErrMess,
  unauthorizedErrMess,
  profileUpdate
} from '../../constants/submit-messages';

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
  const [submitMessage, setSubmitMessage] = React.useState('');

  const [loggedIn, setLoggedIn] = React.useState(false);
  React.useEffect(() => {
    checkAuthorize();
  }, []);
  React.useEffect(() => {
    if(loggedIn) {
      setMovies(JSON.parse(localStorage.getItem('movies')));
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
      .then((data) => {
        if(data === 401) {
          setSubmitMessage(authorizedFailErrMess);
        }
        else {
          getMovies();
          checkCurrentUser(jwt);
          setLoggedIn(true);
          setSubmitMessage('');
          history.push('/movies');
        }
      })
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
      console.log(err);
    });
  }

  function clickRegistration(data) {
    const password = data.password;
    MainApi.register(data)
    .then((data) => {
      if(data === 400) {
        setSubmitMessage(badRequestErrMess);
      }if(data === 409) {
        setSubmitMessage(conflictUserReqErrMess);
      }
      else {
        const user = { 
          email: data.email,
          password: password
        }
        clickLogin(user);
      }
    })
    .catch((err) => {
      setSubmitMessage(InternalServerErrMess);
      console.log(err);
    });
  }

  async function clickLogin(data) {
    await MainApi.authorize(data)
    .then((data) => {
      localStorage.setItem('jwt', data.token);
    })
    .then(() => {
      checkAuthorize();
      history.push("/movies");
    })
    .catch((err) => {
      setSubmitMessage(InternalServerErrMess);
      console.log(err);
    })
  }

  function clickLogout() {
    setToken('');
    setLoggedIn(false);
    localStorage.clear();
    history.push('/');
  }

  function handleEditUser(userData) {
    MainApi.editUser(userData, token)
    .then((userData) => {
      setCurrentUser(userData);
      setSubmitMessage(profileUpdate)
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function getMovies() {
    MoviesApi.getMovies()
    .then((data) => {
      localStorage.setItem('movies', JSON.stringify(data));
    })
    .then(() => {
      setInitMovie(true);
    })
    .catch((err) => {
      console.log(err);
    });

    const jwt = localStorage.getItem('jwt');
    MainApi.getSavedMovies(jwt)
    .then((data) => {
      localStorage.setItem('saved-movies', JSON.stringify(data))
    })
    .then(() => {
      setInitSavedMovie(true);
    })
    .catch((err) => {
      console.log(err);
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
      console.log(err);
    })
  }

  function clickUnsaveMovie(data) {
    MainApi.unSaveMovie(data, token)
    .then((res) => {
      localStorage.setItem('saved-movies', JSON.stringify(savedMovies.filter((item) => item.movieId !== res.movieId)));
      setSavedMovies(JSON.parse(localStorage.getItem('saved-movies')));
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function clickSearch(data) {
    setMovies(JSON.parse(localStorage.getItem('movies')).filter(movie => 
      movie.nameRU.toUpperCase().indexOf(data.toUpperCase()) > -1));
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

      {isPreloader ? 
        <Preloader /> : 

        <Switch>

          <Route exact path="/signup">
            <Register 
              onRegistration={clickRegistration}
              submitMessage={submitMessage}
              setSubmitMessage={setSubmitMessage}
            />
          </Route>

          <Route exact path="/signin">
            <Login 
              onLogin={clickLogin}
              submitMessage={submitMessage}
              setSubmitMessage={setSubmitMessage}
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
            submitMessage={submitMessage}
            setSubmitMessage={setSubmitMessage}
          />

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
            savedMovies={savedMovies}
            clickSearch={clickSearch}
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
            clickSearch={clickSearch}
            clickSaveMovie={clickSaveMovie}
            clickUnsaveMovie={clickUnsaveMovie}
          />

          <Route path="/404">
            <NotFound />
          </Route>

          <Route path="*">
            <Redirect to="/404" />
          </Route>

        </Switch>

        }

        { useRouteMatch(arrayRoutesExcludeFooter) ? null : 
          <Footer />
        }

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
