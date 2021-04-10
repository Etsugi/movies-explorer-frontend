import React from 'react';

function Popup(props) {
  console.log(props.isOpen)
  
  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        {props.children}
        <button type="button" onClick={props.onClose} className="popup__close-button" />
      </div>
      <div onClick={props.onClose} className="popup__overlay"></div>
    </div>
  )
}

export default Popup;