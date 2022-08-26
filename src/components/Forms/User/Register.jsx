import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// firebase
// eslint-disable-next-line
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import swal from "sweetalert";

// css
import "./LogReg.css";

export default function Register() {
  // eslint-disable-next-line
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  // forms and states

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    profilephoto: "",
  });
  const [password, setPassword] = useState("");
  // eslint-disable-next-line
  const [equalPassword, setEPassword] = useState(false);

  // Los handle para el form

  const handleInput = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSecondPassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
    if (password === form.password) {
      setEPassword(true);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setForm({
      username: "",
      email: "",
      password: "",
      profilephoto: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.username && form.email && password === form.password) {
      createUserWithEmailAndPassword(auth, form.email, form.password)
        .then(() => {
          // dispatch(createUser(form));
          swal({
            title: "Usuario creado",
            icon: "success",
            button: "Aceptar",
            timer: "10000",
          });
        })
        .catch((error) => console.log(error))
        .then(() => navigateToHome(e));
    } else {
      swal({
        title: "Los campos marcados con * son obligatrios",
        icon: "error",
        button: "Aceptar",
        timer: "10000",
      });
    }
  };

  // eslint-disable-next-line
  const navigateToHome = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="div">
      <form onSubmit={(e) => handleSubmit(e)}>
        {/* inputs */}
        <ul>
          <label> Ingrese un nombre de usuario*: </label>
          <input
            id="new-username"
            name="username"
            type="text"
            placeholder=" Nombre de usuario"
            value={form.username}
            onChange={(e) => handleInput(e)}
            required
          />
        </ul>
        <ul>
          <label> Ingrese su email*: </label>
          <input
            id="new-email"
            name="email"
            type="text"
            placeholder=" Email"
            value={form.email}
            onChange={(e) => handleInput(e)}
            required
          />
        </ul>
        <ul>
          <label> Ingrese una contraseña*: </label>
          <input
            id="new-password-1"
            name="password"
            type="text"
            placeholder=" Contraseña"
            value={form.password}
            onChange={(e) => handleInput(e)}
            required
          />
        </ul>
        <ul>
          <label> Vuelva a ingresar la contraseña*: </label>
          <input
            id="new-password-2"
            name="second-password"
            type="text"
            placeholder=" Contraseña"
            value={password}
            onChange={(e) => handleSecondPassword(e)}
            required
          />
        </ul>
        <ul>
          <label> Seleccione una foto de perfil: </label>
          {/* eslint-disable-next-line */}
          <input
            id="new-image"
            name="profilephoto"
            type="file"
            value={form.profilephoto}
            onChange={(e) => handleSecondPassword(e)}
            required
          />
        </ul>
        {/* botones */}
        <section>
          <button
            onClick={(e) => {
              handleReset(e);
            }}
          >
            Restablecer
          </button>
        </section>
        <section>
          <button onClick={(e) => handleSubmit(e)}>Guardar</button>
        </section>
        <section>
          <button
            onClick={(e) => {
              navigateToHome(e);
            }}
          >
            Inicio
          </button>
        </section>
      </form>
    </div>
  );
}
