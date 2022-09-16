import { useState } from 'react'

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

// eslint-disable-next-line
import axios from 'axios'

export const useFormLog = (initialState) => {
  const auth = getAuth()

  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({
    email1: [false, ''],
    pass1: [false, ''],
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const resetForm = () => {
    setForm({ mail: '', pass: '' })
    setErrors({
      email1: [false, ''],
      pass1: [false, ''],
    })
  }

  const handleBlur = (e) => {
    handleChange(e)
    setErrors(validateForm(form))
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (validateForm(form.email, form.pass, setErrors)) {
      signInWithEmailAndPassword(auth, form.email, form.pass)
        .then((userCredential) => {
          resetForm()

          // Signed in
          // eslint-disable-next-line
          const user = userCredential.user
          // ...

          // console.log("logueaste");
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode, errorMessage)

          if (errorCode === 'auth/user-not-found') {
            console.log(errorCode)
            setErrors({
              ...errors,
              email1: [true, 'Usuario no encontrado!'],
            })
          } else if (errorCode === 'auth/wrong-password') {
            console.log(errorCode)

            setErrors({
              ...errors,
              pass1: [true, 'Contraseña incorrecta'],
            })
          } else if (errorCode === 'auth/invalid-email') {
            console.log(errorCode)

            setErrors({
              ...errors,
              email1: [true, 'El Email no es valido'],
            })
          } else {
            console.log(errorCode)
          }
        })
    }
  }

  const handleClickShowPassword = () => {
    setForm({
      ...form,
      showPassword: !form.showPassword,
    })
  }

  return {
    form,
    errors,
    handleBlur,
    handleSubmit,
    handleChange,
    handleClickShowPassword,
  }
}

export const regex = {
  email: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
  password: /^.{6,12}$/, // 6 a 16 digitos.
  strictPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/,
  // 6 caracteres, 1 letra minúscula, 1 letra mayúscula, 1 número y 1 caracter especial.
}

export const passwordValidation = (e, errors, setErrors) => {
  const { id, value } = e.target

  /* if (value.length < 6 || value.length > 12) {
    setErrors({
      ...errors,
      [id]: [true, "Debe tener como minimo 6 caracteres y máximo 12"],
    });
    return;
  } */
  if (value.includes(' ')) {
    setErrors({
      ...errors,
      [id]: [true, 'No puede contener espacios en blanco'],
    })
    return
  }
  /* if (!regex.strictPassword.test(value)) {
    setErrors({
      ...errors,
      [id]: [
        true,
        "Debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial",
      ],
    });
    return;
  } */
  setErrors({ ...errors, [id]: [false, ''] })
}

export const emailValidation = (e, errors, setErrors) => {
  const { id, value } = e.target
  const val = value.length > 4
  if (value === '') {
    setErrors({
      ...errors,
      [id]: [false, ''],
    })
    return
  }
  if (value.includes(' ') && val) {
    setErrors({
      ...errors,
      [id]: [true, 'No puede contener espacios en blanco'],
    })
    return
  }
  if (!regex.email.test(value) && val) {
    setErrors({
      ...errors,
      [id]: [true, 'Debe ser un email válido'],
    })
    return
  }
  setErrors({ ...errors, [id]: [false, ''] })
}
export const emailValidationSend = (email, errors, setErrors) => {
  // console.log(value)
  if (email === '') {
    setErrors({
      ...errors,
      email1: [true, 'Ingresa un email válido'],
    })
    return false
  }
  if (email.includes(' ')) {
    setErrors({
      ...errors,
      email1: [true, 'No puede contener espacios en blanco'],
    })
    return false
  }
  if (!regex.email.test(email)) {
    setErrors({
      ...errors,
      email1: [true, 'Debe ser un email válido'],
    })
    return false
  }
  setErrors({ ...errors, email1: [false, ''] })
  return true
}

export const validateForm = (email, password, setErrors) => {
  let isValid = false

  //   Campos vacios
  if (email === '' || password === '') {
    const emailError =
      email === '' ? [true, 'Debe completar este campo'] : [false, '']
    const passwordError =
      password === '' ? [true, 'Debe completar este campo'] : [false, '']
    setErrors({
      email1: emailError,
      pass1: passwordError,
    })

    return isValid
  }

  //   Espacios en blanco
  if (email.includes(' ') || password.includes(' ')) {
    const emailError = email.includes(' ')
      ? [true, 'No puede contener espacios en blanco']
      : [false, '']
    const passwordError = password.includes(' ')
      ? [true, 'No puede contener espacios en blanco']
      : [false, '']
    setErrors({
      email1: emailError,
      pass1: passwordError,
    })
    return isValid
  }

  //   Formato de correo electrónico
  if (!regex.email.test(email)) {
    setErrors({
      email1: [true, 'Tiene que ser un formato email valido'],
      pass1: [false, ''],
    })
    return isValid
  }

  /*  //  Formato de contraseña
  if (!regex.strictPassword.test(password)) {
    return isValid;
  } */

  isValid = true
  return isValid
}
