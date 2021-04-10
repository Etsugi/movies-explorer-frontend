import React from 'react';

import Popup from '../Popup/Popup';

import messageInfo from '../../images/message-info.webp'

function InfoTooltip(props) {

  return (
    <Popup
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <img className="inform__icon" src={messageInfo} alt="Изображение" />
      <h2 className="inform__title">Внимание!</h2>
      <p className="inform__message">Для доступа ко всем функциям сайта необходима авторизация.</p>
      <p className="inform__message">Пожалуйста, войдите в аккаунт, либо воспользуйтесь гостевым.</p>
    </Popup>
  )
}

export default InfoTooltip;