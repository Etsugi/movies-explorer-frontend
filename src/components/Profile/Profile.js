import React from 'react';
import { Formik, Field, useField, Form } from "formik";
import ProfileFormSchema from "../FormValidator/ProfileForm.js";

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {
  const user = React.useContext(CurrentUserContext);

  const [submitMessage, setSubmitMessage] = React.useState('');
  React.useEffect(() => {
    setSubmitMessage(props.submitMessage);
  }, [props.submitMessage]);

  function handleSubmit(values) {
    props.onEditUser({
      name: values.name,
      email: values.email
    });
  }
  function handleLogout() {
    props.onLogout();
  }
  function handleChange() {
    props.setSubmitMessage('');
  };

  return (
    <div className="profile">
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: `${user.name}`,
          email: `${user.email}`
        }}
        validationSchema={ProfileFormSchema}
        onSubmit={values => {
          handleSubmit(values);
        }}
          render={({ errors }) => (
          <Form className="form profile__form" noValidate>
            <h2 className="profile__form-title">Привет, {user.name}!</h2>
            <h3 className="form__input_placeholder profile__form-input_placeholder">Имя</h3>
            <Field 
              type="name" 
              name="name" 
              placeholder="" 
              onInput={handleChange}
              className={errors.name ? 'form__input profile__form-input form__input_error' : 
                'form__input profile__form-input'}
            />
            <span className='form__error profile__form-error'>{errors.name}</span>
            <h3 className="form__input_placeholder profile__form-input_placeholder">Почта</h3>
            <Field
              type="email"
              name="email"
              placeholder=""
              onInput={handleChange}
              className={errors.email ? 'form__input profile__form-input form__input_error' : 
                'form__input profile__form-input'}
            />
            <span className='form__error profile__form-error'>{errors.email}</span>
            <span className="form__error form__submit-message">{submitMessage}</span>
            <button className="profile__form-button" type="submit">Редактировать</button>
            <button onClick={handleLogout} className="profile__form-button profile__form-button_signout" type="button">
              Выйти из аккаунта
            </button>
          </Form>
        )}
      />
    </div>
  );
}

export default Profile;