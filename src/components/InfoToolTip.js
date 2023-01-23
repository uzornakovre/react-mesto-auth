import React from 'react';
import infoToolTipLogo from '../images/popup__tip-error.svg'

function InfoToolTip ({ name,
                        title,
                        isOpen,
                        onClose,
                        onSubmit,
                        onOverlayClick,
                        children }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''} popup_opened`}
         onMouseDown={onOverlayClick}
    >
      <div className={`popup__container popup__container_type_${name}`}>
        <button className="popup__close"
                id={`close-${name}`}
                type="button"
                onMouseDown={onClose}
        >
        </button>
        <div className="popup__message">
          <img className="popup__message-icon" src={infoToolTipLogo} alt="Иконка" />
          <p className="popup__form-title 
                        popup__title_place_info-tool-tip">Что-то пошло не так! Попробуйте ещё раз.</p>
        </div>
      </div>
    </div>  
  )
}

export default InfoToolTip;