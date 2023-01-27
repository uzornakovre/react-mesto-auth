import React                 from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm              from './AuthForm';
import { auth }              from '../utils/auth';

function Register() {

  const [formValue, setFormValue] = React.useState({ email: '', password: '' });
  const navigate = useNavigate();

  // Отправка формы

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log(formValue);

    auth.register(formValue.email, formValue.password)
      .then(() => {
        navigate('/sign-in', {replace: true});
      })
      .catch((error) =>{
        console.log(error);
      })
  }

  // Обработчик изменений полей ввода

  function handleChange(evt) {
    setFormValue({
      ...formValue,
      [evt.target.name]: evt.target.value
    }) 
  }

  return (
    <AuthForm handleSubmit={handleSubmit}
              handleChange={handleChange}
              headingText={'Регистрация'}
              submitText={'Зарегистрироваться'}
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
