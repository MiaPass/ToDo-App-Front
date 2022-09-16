import React from "react";
import { useNavigate } from "react-router-dom";

import { useFormReg, validateForm } from "./useFormReg";

// css
import "./Register.css";

var initialState = {
  profilephoto: "",
  displayName: "",
  email: "",
  password: "",
  repeatPassword: "",
  showPassword: false,
};

export default function Register() {
  const navigate = useNavigate();

  const { form, errors, handleBlur, handleSubmit, handleChange } = useFormReg(
    initialState,
    validateForm
  );

  const handleReset = (e) => {
    e.preventDefault();
    initialState = {
      profilephoto: "",
      displayName: "",
      email: "",
      password: "",
      repeatPassword: "",
      showPasswordOne: false,
      showPasswordTwo: false,
    };
  };

  return (
    <div className="div-reg">
      <div>
        <h2> Cree su usuario </h2>
        <ul>
          <li>El campo 'Nombre' sólo acepta letras y espacios en blanco.</li>
          <li>
            Debe ingresar un correo valido y solo puede contener letras,
            numeros, puntos, guiones y guion bajo.
          </li>
          <li>
            La contraseña debe tener mínimo 6 caracteres, al menos una letra y
            un número.
          </li>
        </ul>
      </div>
      <form className="formReg">
        {/* inputs */}

        <ul>
          <label> Nombre de usuario: </label>
          <input
            id="new-displayName"
            name="displayName"
            type="text"
            placeholder=" Nombre de usuario"
            value={form.displayName}
            onBlur={(e) => handleBlur(e)}
            onChange={(e) => handleChange(e)}
            autoComplete="on"
          />
        </ul>

        <ul>
          <label> Email*: </label>
          <input
            id="new-email"
            name="email"
            type="text"
            placeholder=" Email"
            value={form.email}
            onBlur={(e) => handleBlur(e)}
            onChange={(e) => handleChange(e)}
            autoComplete="on"
            required
          />
        </ul>

        <ul>
          <label> Contraseña*: </label>
          <input
            id="new-password-1"
            name="password"
            type={form.showPasswordOne === true ? "text" : "password"}
            placeholder=" Contraseña"
            value={form.password}
            onBlur={(e) => handleBlur(e)}
            onChange={(e) => handleChange(e)}
            autoComplete="on"
            required
          />
          <button
            onClick={() => {
              form.showPasswordOne = !form.showPasswordOne;
            }}
            type=""
          >
            {form.showPasswordOne === true ? "Ocultar" : "Mostrar"} contraseña
          </button>
        </ul>

        <ul>
          <label> Vuelva a ingresar la contraseña*: </label>
          <input
            id="new-password-2"
            name="repeatPassword"
            type={form.showPasswordTwo === true ? "text" : "password"}
            placeholder=" Contraseña"
            value={form.repeatPassword}
            onBlur={(e) => handleBlur(e)}
            onChange={(e) => handleChange(e)}
            autoComplete="on"
            required
          />
          <button
            onClick={() => {
              form.showPasswordTwo = !form.showPasswordTwo;
            }}
            type=""
          >
            {form.showPasswordTwo === true ? "Ocultar" : "Mostrar"} contraseña
          </button>
        </ul>

        <ul>
          <label> Seleccione una foto de perfil: </label>
          {/* eslint-disable-next-line */}
          <input
            id="new-image"
            name="profilephoto"
            type="file"
            value={form.profilephoto}
            onChange={(e) => handleChange(e)}
          />
        </ul>

        {/* errores */}

        {errors.displayError && <p className="error">{errors.displayError}</p>}
        {errors.succes && <p className="succes">{errors.succes}</p>}

        {/* botones */}

        <section>
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            Registrarse
          </button>
        </section>

        <hr />
      </form>

      <section>
        <button
          onClick={(e) => {
            handleReset(e);
          }}
        >
          Restablecer
        </button>
      </section>

      <hr />

      <button onClick={() => navigate("/")}>Inicio</button>
    </div>
  );
}
