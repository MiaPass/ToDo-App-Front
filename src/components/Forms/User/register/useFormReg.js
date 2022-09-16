import { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

// eslint-disable-next-line
import swal from 'sweetalert'

//El nombre solo puede contener letras
//El apellido solo puede contener letras
//La contraseña tiene que ser de 6 a 14 dígitos.
//El correo solo puede contener letras, numeros, puntos, guiones y guion bajo.

export const validateForm = (form) => {
  let errors = {
    displayError: '',
  }

  const expresiones = {
    displayName: /^(?=.*[A-Za-zÑñÁáÉéÍíÓóÚúÜü])|(?=.*[0-9-_])(?=.*\d)[A-Za-zÑñÁáÉéÍíÓóÚúÜü\d]|[0-9-_\d]{6,21}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    // 8 caracteres, 1 letra minúscula, 1 letra mayúscula, 1 número y 1 caracter especial.
    email: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]+$/,
  }

  //PARA SETEAR EL ESTADO DE LOS ERRORES
  if (!expresiones.displayName.test(form.displayName.trim())) {
    errors.displayError =
      "El campo 'Nombre' solo puede contener letras, numeros, guiones y guion bajo"
  }
  if (!form.displayName.length < 6 && !form.displayName.length > 21) {
    errors.displayError = "El campo 'Nombre' puede tener de 6 a 21 caracteres"
  }

  if (!expresiones.email.test(form.email.trim())) {
    errors.displayError = 'Debe ingresar un correo valido'
  }

  if (!expresiones.email.test(form.email.trim())) {
    errors.email =
      'Debe ser un correo valida y solo puede contener letras, numeros, puntos, guiones y guion bajo'
  }

  if (form.password.length < 8) {
    errors.displayError =
      'La contraseña debe tener 8 caracteres, 1 letra minúscula, 1 letra mayúscula, 1 número y 1 caracter especial.'
  }

  if (form.password.trim() !== form.repeatPassword.trim()) {
    errors.displayError =
      'La contraseña ingresada debe ser igual en los dos casilleros'
  }

  return errors
}

export const useFormReg = (initialState) => {
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({ displayError: '', succes: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleReset = () => {
    setForm(initialState)
  }

  const handleBlur = (e) => {
    handleChange(e)
    setErrors(validateForm(form))
  }

  // console.log("form :",form)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (errors.displayError) {
      console.error(errors.displayError)
    } else {
      const auth = getAuth()
      createUserWithEmailAndPassword(auth, form.email, form.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user

          console.log(user)

          axios.post('http://localhost:3001/api/user/register', {
            email: form.email,
            profilephoto: user.photoURL,
            password: form.password,
            username: form.displayname,
            id: user.uid,
          })

          setErrors({
            succes: 'Usuario registrado correctamente',
          })
          handleReset()
          navigate('/')
        })
        .catch((error) => {
          const errorCode = error.code
          console.log(errorCode)

          if (error && errorCode === 'auth/invalid-email') {
            setErrors({
              displayError: 'El email no es valido',
            })
          } else if (error && errorCode === 'auth/missing-email') {
            setErrors({
              displayError: 'Ingrese un email',
            })
          } else if (error && errorCode === 'auth/weak-password') {
            setErrors({
              displayError:
                'La contraseña debe tener al menos una mayuscula, un simbolo, un numero y un minimo de 8 caracteres',
            })
          } else {
            setErrors({
              displayError:
                'El email con el que se intenta registrar ya esta siendo utilizado',
            })
          }
        })
    }
  }

  const handleClickShowPassword = () => {
    setForm({
      ...form,
      showPassword: !form.showPassword,
    })
    setForm({
      ...form,
      showPassword: !form.showPassword,
    })
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
