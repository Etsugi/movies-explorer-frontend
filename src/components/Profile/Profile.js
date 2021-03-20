import React from 'react';
import { Formik, Field, Form } from "formik";
import ProfileFormSchema from "../FormValidator/ProfileForm.js";

import PreloaderFull from "../PreloaderFull/PreloaderFull.js";

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {
  const user = React.useContext(CurrentUserContext);
  const [isPreloader, setPreloader] = React.useState(true);
  React.useEffect(() => {
    setPreloader(false);;
  }, [user]);

  function handleSubmit(values) {
    setPreloader(true);
    props.onEditUser({
      name: values.name,
      email: values.email
    });
  }

  function handleLogout() {
    props.onLogout();
  }

  return (
    <main className="profile">
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
      >
          {props => (
          <Form className="form profile__form" noValidate>
            {isPreloader ? <PreloaderFull /> : ''}
            <h2 className="profile__form-title">Привет, {user.name}!</h2>
            <h3 className="form__input_placeholder profile__form-input_placeholder">Имя</h3>
            <Field 
              type="text" 
              name="name" 
              placeholder="" 
              className={props.errors.name ? 'form__input profile__form-input form__input_error' : 
                'form__input profile__form-input'}
            />
            <span className='form__error profile__form-error'>{props.errors.name}</span>
            <h3 className="form__input_placeholder profile__form-input_placeholder">Почта</h3>
            <Field
              type="text"
              name="email"
              placeholder=""
              className={props.errors.email ? 'form__input profile__form-input form__input_error' : 
                'form__input profile__form-input'}
            />
            <span className='form__error profile__form-error'>{props.errors.email}</span>
            <button className="profile__form-button" type="submit">Редактировать</button>
            <button onClick={handleLogout} className="profile__form-button profile__form-button_signout" type="button">
              Выйти из аккаунта
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default Profile;