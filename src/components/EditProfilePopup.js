import React                  from 'react';
import PopupWithForm          from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpen,
                            onClose,
                            onUpdateUser,
                            isLoading,
                            onOverlayClick }) {

  const currentUser                   = React.useContext(CurrentUserContext);
  const nameRef                       = React.useRef();
  const descRef                       = React.useRef();
  const [name,        setName       ] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [nameError,   setNameError  ] = React.useState('');
  const [descError,   setDescError  ] = React.useState('');
  const isValid                       = nameError === '' && descError === '';

  // Отправка формы

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description
    });
  }

  // Обновление стейтов при открытии модального окна
 
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setNameError(nameRef.current.validationMessage);
    setDescError(descRef.current.validationMessage);
  }, [isOpen, currentUser.about, currentUser.name]);

  // обработчики изменений полей ввода

  function handleChangeName(evt) {
    setName(evt.target.value);
    setNameError(nameRef.current.validationMessage);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
    setDescError(descRef.current.validationMessage);
  }

  return (
    <PopupWithForm name={'edit-profile'}
                   title={'Редактировать профиль'}
                   isOpen={isOpen}
                   onClose={onClose}
                   onSubmit={handleSubmit}
                   isValid={isValid}
                   isLoading={isLoading}
                   onOverlayClick={onOverlayClick}
    >
      <input type="text"
             className={`popup__form-input popup__form-input_content_name ${
               nameError !== '' && 'popup__form-input_error'
             }`}
             id="name"
             name="name"
             placeholder="Имя"
             minLength="2"
             maxLength="40"
             value={name || ''}
             ref={nameRef}
             onChange={handleChangeName}
             required
      />
      <span className="popup__form-input-error popup__form-input-error_content_name">
        {nameError}
      </span>
      <input type="text"
             className={`popup__form-input popup__form-input_content_job ${
               descError !== '' && 'popup__form-input_error'
             }`}
             id="job"
             name="description"
             placeholder="Профессия"
             minLength="2"
             maxLength="200"
             value={description || ''}
             ref={descRef}
             onChange={handleChangeDescription}
             required
      />
      <span className="popup__form-input-error popup__form-input-error_content_job">
        {descError}
      </span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;