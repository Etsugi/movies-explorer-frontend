import React from 'react';
import { Formik, Field, Form } from "formik";
import MoviesSearchFormSchema from "../FormValidator/MoviesSearchForm.js";

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {

  function handleSubmit(values) {
    props.clickSearch(values.request);
  }

  return(
    <Formik
        initialValues={{
          request: ""
        }}
        validationSchema={MoviesSearchFormSchema}
        onSubmit={values => {
          handleSubmit(values);
        }}
        render={({ errors }) => (
          <Form className="search-form" noValidate>
            <div className="search-form__container">
              <Field 
                type="request"
                name="request" 
                placeholder="Фильм" 
                className={errors.request ? 'search-form__input form__input_error' : 'search-form__input'}
              />
              <span className='search-form__error'>{errors.request}</span>
              <button 
                className={(errors.request) ? 'search-form__button form__button_disabled' : 'search-form__button'} 
                type="submit"
              >
                Поиск
              </button>
            </div>
            <FilterCheckbox 
              clickCheckBox={props.clickCheckBox}
            />
          </Form>
        )}
      />
  );
}

export default SearchForm;