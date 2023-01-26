import React                 from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth }              from '../utils/auth';

function Login ({ handleLogin }) {

  const emailRef                    = React.useRef();
  const passRef                     = React.useRef();
  const [email,      setEmail     ] = React.useState('');
  const [password,   setPassword  ] = React.useState('');
  const [emailInit,  setEmailInit ] = React.useState(false);
  const [passInit,   setPassInit  ] = React.useState(false);
  const [emailError, setEmailError] = React.useState('');
  const [passError,  setPassError ] = React.useState('');
  const isValid                     = emailError === '' && passError === '';
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
      console.log(res);
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

    // Обновление стейтов при открытии окна

    // React.useEffect(() => {
    //   setEmail('');
    //   setPassword('');
    //   setEmailInit(false);
    //   setPassInit(false);
    //   setEmailError(emailRef.current.validationMessage);
    //   setPassError(passRef.current.validationMessage);
    // }, [])
  
    // Обработчики изменений полей ввода

    function handleChange(evt) {
      console.log(formValue);
      setFormValue({
        ...formValue,
        [evt.target.name]: evt.target.value
      }) 
    }
  
  //  function handleChangeEmail (evt) {
  //     setEmail(evt.target.value);
  //     setEmailInit(true);
  //     setEmailError(emailRef.current.validationMessage);
  //     setFormValue({
  //       ...formValue,
  //       [evt.target.name]: email
  //     })
  //     console.log(formValue);
  //   }
  
  //  function handleChangePassword (evt) {
  //     setPassword(evt.target.value);
  //     setPassInit(true);
  //     setPassError(passRef.current.validationMessage);
  //     setFormValue({
  //       ...formValue,
  //       [evt.target.name]: password
  //     })
  //     console.log(formValue);
  //   }

  return (
    <>
      <form className="auth"
            onSubmit={handleSubmit}
      >
        <h2 className="auth__title">Вход</h2>
        <input type="email"
               name="email"
               className={`auth__input auth__input_type_email ${
                 emailInit && emailError !== '' && 'auth__input_error'   
               }`}
               placeholder="Email"
               onChange={handleChange}
              //  value={email || ''}
              //  ref={emailRef}
               required
        />
        <span className="auth__input-error">
          {emailInit && `${emailError}`}
        </span>
        <input type="password"
               name='password'
               className={`auth__input auth__input_type_password ${
                 passInit && passError !== '' && 'auth__input_error'   
               }`}
               placeholder="Пароль"
               minLength="4"
               maxLength="12"
               onChange={handleChange}
              //  value={password || ''}
              //  ref={passRef}
               defaultValue={''}
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