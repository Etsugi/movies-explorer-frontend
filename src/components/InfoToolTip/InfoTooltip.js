import React from 'react';

import Popup from '../Popup/Popup';

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
    <Popup
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <img className="info-tool-tip__icon"
        src={image}
        alt={imageAlt}
      />
      <p className="info-tool-tip__message">{props.message}</p>
    </Popup>
  )
}

export default InfoTooltip;