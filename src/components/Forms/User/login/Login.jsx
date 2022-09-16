import React from 'react'
import { useNavigate } from 'react-router-dom'

import { validateForm, useFormLog } from './useFormLog'

// eslint-disable-next-line
import swal from 'sweetalert'

// css
import './Login.css'

var initialState = {
  email: '',
  pass: '',
  showPassword: false,
}

export default function Login() {
  const navigate = useNavigate()

  const { form, errors, handleSubmit, handleChange, handleBlur } = useFormLog(
    initialState,
    validateForm,
  )

  return (
    <div className="div-log">
      <form className="formLog" onSubmit={(e) => handleSubmit(e)}>
        {/* inputs */}

        <div>
          <label htmlFor="email">Email</label>
          <input
            className={errors.email1[0] ? 'errors' : ``}
            onChange={(e) => handleChange(e)}
            type="text"
            name="email"
            value={form.email}
          />
          {errors.email1[0] ? <span>{errors.email1[1]}</span> : false}
        </div>

        <div>
          <label htmlFor="pass">Contraseña</label>
          <input
            className={errors.pass1[0] ? 'errors' : ``}
            onBlur={(e) => handleBlur(e)}
            onChange={(e) => handleChange(e)}
            type={form.showPasswordOne === true ? 'text' : 'password'}
            name="pass"
            value={form.pass}
          />
          {errors.pass1[0] ? <span>{errors.pass1[1]}</span> : false}
        </div>

        {/* botones */}

        <button onClick={() => navigate('/recovery')}>
          ¿Olvidaste la contraseña?
        </button>

        <button type="submit" className="btnLogin">
          Entrar
        </button>

        <ul>
          <button
            onClick={(e) => {
              handleSubmit(e)
            }}
          >
            Guardar
          </button>
        </ul>

        <ul>
          <button
            onClick={() => {
              navigate('/')
            }}
          >
            Inicio
          </button>
        </ul>
      </form>
    </div>
  )
}
