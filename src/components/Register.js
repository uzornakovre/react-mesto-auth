import React                 from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm              from './AuthForm';
import { auth }              from '../utils/auth';

function Register({ openInfoToolTip, formData }) {

  const navigate = useNavigate();

  function handleSubmit(evt) {
    evt.preventDefault();

    auth.register(formData.values.email, formData.values.password)
      .then(() => {
        openInfoToolTip('confirm', 'Вы успешно зарегистрировались');
        navigate('/sign-in', {replace: true});
      })
      .catch((error) =>{
        openInfoToolTip('error', 'Что-то пошло не так! Попробуйте еще раз.');
        console.log(error);
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