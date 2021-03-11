import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form } from "formik";
import ProfileFormSchema from "../FormValidator/ProfileForm.js";


function Profile(props) {

  function handleSubmit(values) {
    props.onProfile({
      name: values.name,
      email: values.email
    });
  }

  return (
    <div className="profile">
      <Formik
        initialValues={{
          name: `${props.user.name}`,
          email: `${props.user.email}`
        }}
        validationSchema={ProfileFormSchema}
        onSubmit={values => {
          handleSubmit(values);
        }}
        render={({ errors }) => (
          <Form className="form profile__form" noValidate>
            <h2 className="profile__form-title">Привет, {props.user.name}!</h2>
            <h3 className="form__input_placeholder profile__form-input_placeholder">Имя</h3>
            <Field type="name" name="name" placeholder="" className={errors.name ? 
              'form__input profile__form-input form__input_error' : 'form__input profile__form-input'}/>
              <span className='form__error profile__form-error'>{errors.name}</span>
            <h3 className="form__input_placeholder profile__form-input_placeholder">Почта</h3>
            <Field type="email" name="email" placeholder="" className={errors.email ? 
              'form__input profile__form-input form__input_error' : 'form__input profile__form-input'}/>
              <span className='form__error profile__form-error'>{errors.email}</span>
            <button className="profile__form-button" type="submit">Редактировать</button>
            <Link to="/signin" className="profile__form-button profile__form-button_signout" type="button">
              Выйти из аккаунта
            </Link>
          </Form>
        )}
      />
    </div>
  );
}

export default Profile;