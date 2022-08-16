import React, { useState } from "react";
import { useDispatch } from "react-redux";

import swal from "sweetalert";

import { createTodo } from "../../redux/action";

import "./Forms.css";

export default function Create({ setOpenCreate }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "incomplete",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title && !form.description) {
      swal({
        title: "Por favor ingrese un titulo o una descripción",
        icon: "error",
        button: "Aceptar",
        timer: "10000",
      });
    } else {
      dispatch(createTodo(form));
      handleReset(e);
    }
  };

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
      title: "",
      description: "",
    });
  };

  try {
    return (
      <div>
        <h2> Crear Tarea</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            name="title"
            type="text"
            value={form.title}
            placeholder=" Titulo..."
            onChange={(e) => handleInput(e)}
          />
          <hr />
          <textarea
            name="description"
            type="text"
            value={form.description}
            placeholder=" Descripción..."
            onChange={(e) => handleInput(e)}
          />
          <hr />
          <input type="reset" onClick={(e) => handleReset(e)} />
          <hr />
          <input
            type="submit"
            onSubmit={(e) => handleSubmit(e)}
            placeholder="Guardar"
          />
        </form>
        <hr />
        <div id="out-create">
          <button
            onClick={(e) => {
              setOpenCreate(false);
              handleReset(e);
              window.location.reload();
            }}
          >
            Cancelar
          </button>
          <button
            onClick={(e) => {
              window.location.reload();
            }}
          >
            Inicio
          </button>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
  }
}
