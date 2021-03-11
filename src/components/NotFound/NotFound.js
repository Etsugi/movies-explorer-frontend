import React from 'react';
import { useHistory } from 'react-router-dom';

function NotFound() {
  const history = useHistory();

  return (
    <section className="not-found" >
      <h1 className="not-found__text_big">404</h1>
      <h2 className="not-found__text_small">Страница не найдена</h2>
      <button onClick={history.goBack} className="not-found__button" type="button">Назад</button>
    </section>
  );
}

export default NotFound;