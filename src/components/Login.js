import React from 'react';

function Login () {
  return (
    <>
      <form className="auth">
        <h2 className="auth__title">Вход</h2>
        <input type="email"
              className="auth__input auth__input_type_email"
              placeholder="Email"
              defaultValue=""
        />
        <span className="auth__input-error auth__input-error_place_email">
          {/* {nameError} */}
        </span>
        <input type="password"
              className="auth__input auth__input_type_password"
              placeholder="Пароль"
              defaultValue=""
        />
        <span className="auth__input-error auth__input-error_place_email">
          {/* {nameError} */}
        </span>
        <button type="submit" className="auth__submit">
          Войти
        </button>
      </form>
    </> 
  )
}

export default Login;