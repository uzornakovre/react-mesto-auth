import React         from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen,
                           onClose,
                           formData,
                           onUpdateAvatar,
                           isLoading,
                           onOverlayClick }) {

  // Отправка формы

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: formData.values.avatarUrl
    })
  }

  return (
    <PopupWithForm name={'avatar'}
                   title={'Обновить аватар'}
                   isOpen={isOpen}
                   onClose={onClose}
                   onSubmit={handleSubmit}
                   isValid={formData.isValid}
                   isLoading={isLoading}
                   onOverlayClick={onOverlayClick}
    >
      <input type="url"
             className={`popup__form-input popup__form-input_content_avatar ${
               formData.errors.avatarUrl && 'popup__form-input_error'
             }`}
             id="avatar-url"
             name="avatarUrl"
             placeholder="Ссылка на аватар"
             value={formData.values.avatarUrl || ''}
             onChange={formData.handleChange}
             required
      />
      <span className="popup__form-input-error popup__form-input-error_content_avatar">
        {formData.errors.avatarUrl} 
      </span>  
    </PopupWithForm>
  )
}

export default EditAvatarPopup;