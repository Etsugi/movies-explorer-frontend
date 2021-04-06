import React from 'react';
import { Formik, Field, Form } from "formik";
import MoviesSearchFormSchema from "../FormValidator/MoviesSearchForm.js";

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {

  function handleSubmit(values) {
    props.clickSearch(values.request);
  }

  function clickCheckBox() {
    props.clickCheckBox()
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
    >
      {props => (
        <Form className="search-form" noValidate>
          <div className="search-form__container">
            <Field 
              type="text"
              name="request" 
              placeholder="Фильм"
              className={props.errors.request ? 'search-form__input form__input_error' : 'search-form__input'}
            />
            <span className='search-form__error'>{props.errors.request}</span>
            <button 
              className={(props.errors.request) ? 'search-form__button form__button_disabled' : 'search-form__button'} 
              type="submit"
            >
              Поиск
            </button>
          </div>
          <FilterCheckbox 
            clickCheckBox={clickCheckBox}
          />
        </Form>
      )}
    </Formik>
  );
}

export default SearchForm;