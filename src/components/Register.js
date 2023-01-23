import React from "react";
import { Link } from "react-router-dom";

function Register() {
  return (
    <>
      <form className="auth">
        <h2 className="auth__title">Регистрация</h2>
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
          Зарегистрироваться
        </button>
        <p className="auth__tip">
          Уже зарегистрированы? {<Link to="/sign-in" class="auth__link">
                                   Войти
                                 </Link>}
        </p>
      </form>
    </>
  );
}

export default Register;
