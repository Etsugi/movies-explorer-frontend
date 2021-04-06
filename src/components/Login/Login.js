import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form } from "formik";
import LoginFormSchema from "../FormValidator/LoginForm.js";

import Logo from "../../images/logo.svg";

function Login(props) {

  function handleSubmit(values) {
    props.onLogin({
      email: values.email,
      password: values.password
    });
  };

  return (
    <main className="login">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: ""
        }}
        validationSchema={LoginFormSchema}
        onSubmit={values => {
          handleSubmit(values);
        }}
      >
        {props => (
          <Form className="form" noValidate>
            <Link to="/" className="form__logo-container">
              <img className="form__logo" src={`${Logo}`} alt="Лого" />
            </Link>
            <h2 className="form__title">Рады видеть!</h2>
            <h3 className="form__input_placeholder">E-mail</h3>
            <Field
              type="text"
              name="email"
              placeholder=""
              className={props.errors.email ? 'form__input form__input_error' : 'form__input'}
            />
            <span className='form__error'>{props.errors.email}</span>
            <h3 className="form__input_placeholder">Пароль</h3>
            <Field
              type="password"
              name="password"
              placeholder=""
              className={props.errors.password ? 'form__input form__input_error' : 'form__input'}
            />
            <span className='form__error'>{props.errors.password}</span>
            <button className={(props.errors.password || props.errors.email) ? 'form__button form__button_disabled' : 
              'form__button'} type="submit">Войти</button>
            <div className="form__switch">
              <p className="form__switch_text">Ещё не зарегистрированы?</p>
              <Link to="/signup" className="form__switch_text form__switch_button">Регистрация</Link>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default Login;