import React from 'react';

import { InfoToolTipImageAlt } from '../../constants/constants';

import messageOk from '../../images/message-ok.webp'
import messageFail from '../../images/message-fail.webp'

function InfoTooltip(props) {
  const [image, setImage] = React.useState('');
  const [imageAlt, setImageAlt] = React.useState('');
  React.useEffect(() => {
    if(props.messageType === true) {
      setImage(messageOk);
      setImageAlt(InfoToolTipImageAlt.ok);
    } else {
      setImage(messageFail);
      setImageAlt(InfoToolTipImageAlt.fail);
    }
  }, [props.messageType])

  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <img className="popup__icon"
          src={image}
          alt={imageAlt}
        />
        <p className="popup__message">{props.message}</p>
        <button type="button" onClick={props.onClose} className="popup__close-button" />
      </div>
      <div onClick={props.onClose} className="popup__overlay"></div>
    </div>
  )
}

export default InfoTooltip;