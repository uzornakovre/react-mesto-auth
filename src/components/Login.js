import React           from 'react';
import { useNavigate } from 'react-router-dom';
import { auth }        from '../utils/auth';
import AuthForm        from './AuthForm';

function Login ({ handleLogin }) {

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
      setFormValue({
        email: '',
        password: ''
      })
      handleLogin(formValue.email);
      navigate('/', {replace: true});
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
              headingText={'Вход'}
              submitText={'Войти'}
    />
  );
}

export default Login;