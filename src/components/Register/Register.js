import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form } from "formik";
import RegisterFormSchema from "../FormValidator/RegisterForm.js";

import Logo from "../../images/logo.svg";

function Register(props) {

  function handleSubmit(values) {
    props.onRegistration({
      name: values.name,
      email: values.email,
      password: values.password
    });
  }

  return (
    <main className="register">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: ""
        }}
        validationSchema={RegisterFormSchema}
        onSubmit={values => {
          handleSubmit(values);
        }}
      >
        {props => (
          <Form className="form" noValidate>
            <Link to="/" className="form__logo-container">
              <img className="form__logo" src={`${Logo}`} alt="Лого" />
            </Link>
            <h2 className="form__title">Добро пожаловать!</h2>
            <h3 className="form__input_placeholder">Имя</h3>
            <Field
              type="text"
              name="name"
              placeholder=""
              className={props.errors.name ? 'form__input form__input_error' : 'form__input'}
            />
            <span className='form__error'>{props.errors.name}</span>
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
            <button 
              className={(props.errors.name || props.errors.password || props.errors.email) 
                  ? 'form__button form__button_disabled' : 'form__button'}
                type="submit"
              >
                Зарегистрироваться
              </button>
            <div className="form__switch">
              <p className="form__switch_text">Уже зарегистрированы?</p>
              <Link to="/signin" className="form__switch_text form__switch_button">Войти</Link>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default Register;