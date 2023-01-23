import React from 'react';

function Login () {

  const emailRef                    = React.useRef();
  const passRef                     = React.useRef();
  const [email,      setEmail     ] = React.useState('');
  const [password,   setPassword  ] = React.useState('');
  const [emailInit,  setEmailInit ] = React.useState(false);
  const [passInit,   setPassInit  ] = React.useState(false);
  const [emailError, setEmailError] = React.useState('');
  const [passError,  setPassError ] = React.useState('');
  const isValid                     = emailError === '' && passError === '';

  // Отправка формы

  function handleSubmit(evt) {
    evt.preventDefault();

    emailRef.current.value = '';
    passRef.current.value = '';
  }

  // Обновление стейтов при открытии окна

  React.useEffect(() => {
    setEmail('');
    setPassword('');
    setEmailInit(false);
    setPassInit(false);
    setEmailError(emailRef.current.validationMessage);
    setPassError(passRef.current.validationMessage);
  }, [])

  // Обработчики изменений полей ввода

  function handleChangeEmail (evt) {
    setEmail(evt.target.value);
    setEmailInit(true);
    setEmailError(emailRef.current.validationMessage);
  }

  function handleChangePassword (evt) {
    setPassword(evt.target.value);
    setPassInit(true);
    setPassError(passRef.current.validationMessage);
  }

  return (
    <>
      <form className="auth"
            onSubmit={handleSubmit}
      >
        <h2 className="auth__title">Вход</h2>
        <input type="email"
               className={`auth__input auth__input_type_email ${
                 emailInit && emailError !== '' && 'auth__input_error'   
               }`}
               placeholder="Email"
               onChange={handleChangeEmail}
               value={email || ''}
               ref={emailRef}
               required
        />
        <span className="auth__input-error">
          {emailInit && `${emailError}`}
        </span>
        <input type="password"
               className={`auth__input auth__input_type_password ${
                 passInit && passError !== '' && 'auth__input_error'   
               }`}
               placeholder="Пароль"
               minLength="4"
               maxLength="12"
               onChange={handleChangePassword}
               value={password || ''}
               ref={passRef}
               required
        />
        <span className="auth__input-error">
          {passInit && `${passError}`}
        </span>
        <button type="submit" 
                className={`auth__submit ${!isValid && 'auth__submit_disabled'}`}
                disabled={!isValid}>
          Войти
        </button>
      </form>
    </>
  );
}

export default Login;