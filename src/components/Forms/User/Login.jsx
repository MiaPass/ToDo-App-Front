import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import swal from "sweetalert";

export default function Login() {
  // eslint-disable-next-line
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // forms and states

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Los handle para el form

  const handleInput = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setForm({
      email: "",
      password: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.email && form.password) {
      //   dispatch(login(form));
    } else {
      swal({
        title: "El email o la contraseña son incorrectos",
        icon: "error",
        button: "Aceptar",
        timer: "10000",
      });
    }
  };

  const navigateToHome = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="div">
      <form onSubmit={(e) => handleSubmit(e)}>
        {/* inputs */}

        <input
          id="log-email"
          name="email"
          type="text"
          placeholder=" Email"
          value={form.email}
          onChange={(e) => handleInput(e)}
          required
        />
        <input
          id="log-password"
          name="password"
          type="text"
          placeholder=" Contraseña"
          value={form.password}
          onChange={(e) => handleInput(e)}
          required
        />

        {/* botones */}

        <button
          onClick={(e) => {
            handleReset(e);
          }}
        >
          Restablecer
        </button>

        <button
          onClick={(e) => {
            handleSubmit(e).then((e) => navigateToHome(e));
          }}
        >
          Guardar
        </button>
      </form>
      <button
        onClick={(e) => {
          handleReset(e).then((e) => navigateToHome(e));
        }}
      >
        Inicio
      </button>
    </div>
  );
}
