import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function RecoverPassword() {
  const navigate = useNavigate();

  const [recover, setRecover] = useState({ email: "" });
  const [succes, setSucces] = useState({ message: "" });
  const [error, setError] = useState({ errors: "" });

  const handleChange = (e) => {
    setRecover({
      ...recover,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setRecover({ email: "" });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    sendPasswordResetEmail(auth, recover.email)
      .then(() => {
        // Password reset email sent!
        setSucces({
          message: "Email de recuperacion enviado al correo indicado",
        });
        // console.log('email enviado')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
        if (!recover.email) {
          setError({
            errors: "Debe ingresar un correo valido",
          });
        } else if (error) {
          setError({
            errors: "El email no se encuentra registrado",
          });
        } else {
          setError({
            errors: "",
          });
        }
      });
    handleReset();
  };
  return (
    <div>
      <h1>Recuperar contraseña</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <p>Introduzca el email con el que se ha registrado: </p>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={recover.email}
          onChange={handleChange}
          autocomplete="off"
        />
        <button type="Submit">Enviar</button>
      </form>

      {error.errors && <p className="errors-email">{error.errors}</p>}
      {succes.message && <p className="errors-email">{succes.message}</p>}

      <button
        onClick={() => {
          navigate("/login-register");
        }}
      >
        Volver
      </button>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Inicio
      </button>
    </div>
  );
}
