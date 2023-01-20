import React         from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmationPopup({ isOpen,
                             onClose,
                             onConfirmDelete,
                             currentCard,
                             isLoading,
                             onOverlayClick }) {

  function handleSubmit(evt) {
    evt.preventDefault();
    onConfirmDelete(currentCard);
  }

  return (
    <PopupWithForm name={'delete-card'}
                   title={'Вы уверены?'}
                   isOpen={isOpen}
                   onClose={onClose}
                   onSubmit={handleSubmit}
                   isValid={true}
                   isLoading={isLoading}
                   onOverlayClick={onOverlayClick}
    >
    </PopupWithForm>
  )
}

export default ConfirmationPopup;