import React       from 'react';
import InfoToolTip from './InfoToolTip';

function AuthForm({ handleSubmit, 
                    handleChange, 
                    headingText,
                    submitText,
                    children }) {

  // const emailRef                    = React.useRef();
  // const passRef                     = React.useRef();
  // const [email,      setEmail     ] = React.useState('');
  // const [password,   setPassword  ] = React.useState('');
  const [emailInit,  setEmailInit ] = React.useState(false);
  const [passInit,   setPassInit  ] = React.useState(false);
  const [emailError, setEmailError] = React.useState('');
  const [passError,  setPassError ] = React.useState('');
  const isValid                     = emailError === '' && passError === '';
  // const [formValue,  setFormValue ] = React.useState({
  //   email: '',
  //   password: ''
  // })

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

  // function handleChange(evt) {
  //   console.log(formValue);
  //   setFormValue({
  //     ...formValue,
  //     [evt.target.name]: evt.target.value
  //   }) 
  // }

//  function handleChangeEmail (evt) {
//     setEmail(evt.target.value);
//     setEmailInit(true);
//     setEmailError(emailRef.current.validationMessage);
//     setFormValue({
//       ...formValue,
//       [evt.target.name]: email
//     })
//   }

//  function handleChangePassword (evt) {
//     setPassword(evt.target.value);
//     setPassInit(true);
//     setPassError(passRef.current.validationMessage);
//     setFormValue({
//       ...formValue,
//       [evt.target.name]: password
//     })
//   }

  return (
    <>
      <form className="auth"
            onSubmit={handleSubmit}
            noValidate
      >
        <h2 className="auth__title">{headingText}</h2>
        <input type="email"
              name="email"
              className={`auth__input auth__input_type_email ${
                emailInit && emailError !== '' && 'auth__input_error'   
              }`}
              placeholder="Email"
              onChange={handleChange}
              //  value={email || ''}
              //  ref={emailRef}
              defaultValue={''}
              required
        />
        <span className="auth__input-error">
          {emailInit && `${emailError}`}
        </span>
        <input type="password"
              name="password"
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
          {submitText}
        </button>
        {children}
      </form>
      <InfoToolTip />
    </>
  )
}

export default AuthForm;