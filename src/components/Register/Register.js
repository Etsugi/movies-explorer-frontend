import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form } from "formik";
import RegisterFormSchema from "../FormValidator/RegisterForm.js";

import Logo from "../../images/logo.svg";

function Register(props) {
  const [submitMessage, setSubmitMessage] = React.useState('');
  React.useEffect(() => {
    setSubmitMessage(props.submitMessage);
  }, [props.submitMessage]);

  function handleSubmit(values) {
    props.onRegistration({
      name: values.name,
      email: values.email,
      password: values.password
    });
  }

  function handleChange() {
    props.setSubmitMessage('');
  }

  return (
    <div className="register">
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
        render={({ errors }) => (
          <Form className="form" noValidate>
            <Link
              to="/"
              className="form__logo-container"
              type="button"
            >
              <img className="form__logo" src={`${Logo}`} alt="Лого" />
            </Link>
            <h2 className="form__title">Добро пожаловать!</h2>
            <h3 className="form__input_placeholder">Имя</h3>
            <Field
              type="name"
              name="name"
              placeholder=""
              onInput={handleChange}
              className={errors.name ? 'form__input form__input_error' : 'form__input'}
            />
            <span className='form__error'>{errors.name}</span>
            <h3 className="form__input_placeholder">E-mail</h3>
            <Field
              type="email"
              name="email"
              placeholder=""
              onInput={handleChange}
              className={errors.email ? 'form__input form__input_error' : 'form__input'}
            />
            <span className='form__error'>{errors.email}</span>
            <h3 className="form__input_placeholder">Пароль</h3>
            <Field
              type="password"
              name="password"
              placeholder=""
              onInput={handleChange}
              className={errors.password ? 'form__input form__input_error' : 'form__input'}
            />
            <span className='form__error'>{errors.password}</span>
            <span className="form__error form__submit-message">{submitMessage}</span>
            <button className={(errors.name || errors.password || errors.email) ? 'form__button form__button_disabled' : 
              'form__button'} type="submit">Зарегистрироваться</button>
            <div className="form__switch">
              <p className="form__switch_text">Уже зарегистрированы?</p>
              <Link to="/signin" className="form__switch_text form__switch_button" type="button">Войти</Link>
            </div>
          </Form>
        )}
      />
    </div>
  );
}

export default Register;