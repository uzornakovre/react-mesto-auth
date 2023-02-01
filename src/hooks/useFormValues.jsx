import React from 'react';

function useFormValues() {
  const [values,  setValues ] = React.useState({});
  const [errors,  setErrors ] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  function handleChange(evt) {
    const { value, name } = evt.target;

    setValues({
      ...values,
      [name]: value
    })

    setErrors({
      ...errors,
      [name]: evt.target.validationMessage
    })

    setIsValid(evt.target.closest('form').checkValidity());
  }

  function resetFormValues() {
    setValues({});
    setErrors({});
    setIsValid(false);
  }


  return { values, errors, isValid, handleChange, setValues, setIsValid, resetFormValues }
}

export default useFormValues;