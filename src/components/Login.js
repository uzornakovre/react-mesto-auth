import React           from 'react';
import { useNavigate } from 'react-router-dom';
import { auth }        from '../utils/auth';
import AuthForm        from './AuthForm';

function Login ({ handleLogin, openInfoToolTip }) {

  const [formValue,  setFormValue ] = React.useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate();

  // Отправка формы

  function handleSubmit(evt) {
    evt.preventDefault();

    auth.login(formValue.email, formValue.password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setFormValue({
          email: '',
          password: ''
        })
        handleLogin();
        navigate('/', {replace: true});
      })
      .catch((error) =>{
        openInfoToolTip('error', 'Неверный логин или пароль.');
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
              headingText={'Вход'}
              submitText={'Войти'}
    />
  );
}

export default Login;