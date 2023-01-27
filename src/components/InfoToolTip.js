import React               from 'react';
import infoToolTipError    from '../images/popup__tip-error.svg';
import infoToolTipPositive from '../images/popup__tip-complete.svg';

function InfoToolTip ({ name,
                        isOpen,
                        onClose,
                        onOverlayClick,
                        infoToolTipContent }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
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
          <img className="popup__message-icon" src={infoToolTipError} alt="Иконка" />
          <p className="popup__form-title 
                        popup__title_place_info-tool-tip"></p>
        </div>
      </div>
    </div>  
  )
}

export default InfoToolTip;