import React                 from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm              from './AuthForm';
import { auth }              from '../utils/auth';

function Register({ openInfoToolTip, formData }) {

  const navigate = useNavigate();

  function handleSubmit(evt) {
    evt.preventDefault();

    auth.register(formData.values.email, formData.values.password)
      .then((res) => {
        if (!res.error && !res.message) {
          openInfoToolTip('confirm', 'Вы успешно зарегистрировались');
          navigate('/sign-in', {replace: true});
        } else if (!res.error) {
          openInfoToolTip('error', 'Вы ввели некорректный email. Попробуйте еще раз');
        } else {
          openInfoToolTip('error', res.error);
        }
      })
  }

  return (
    <AuthForm handleSubmit={handleSubmit}
              headingText={'Регистрация'}
              submitText={'Зарегистрироваться'}
              formData={formData}
    >
        <p className="auth__tip">
          Уже зарегистрированы? {<Link to="/sign-in" className="auth__link">
                                  Войти
                                </Link>}
        </p>
    </AuthForm>
  );
}

export default Register;