import React, { useState } from "react";
import { useDispatch } from "react-redux";

import swal from "sweetalert";

import { modify } from "../../redux/action";
import Changes from "../Changes/Options";

import "./Forms.css";

export default function Modify({ setOpenModify, data }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    id: data._id,
    title: data.title,
    description: data.description,
    status: data.status,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    if (!form.title && !form.description) {
      swal({
        title: "Por favor ingrese un titulo o una descripción",
        icon: "error",
        button: "Aceptar",
        timer: "10000",
      });
    } else {
      dispatch(modify(form)).then(() => {
        setOpenModify({ status: false, on: form.id });
        window.location.reload();
      });
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
      title: data.title,
      description: data.description,
      status: data.status,
    });
  };
  // console.log(data);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        className="form-title"
        id="inputs"
        name="title"
        type="text"
        placeholder="Titulo"
        value={form.title}
        onChange={(e) => handleInput(e)}
      />

      <hr />

      <textarea
        id="inputs"
        name="description"
        type="text"
        placeholder="Descripcion"
        value={form.description}
        onChange={(e) => handleInput(e)}
      />

      <hr />

      <Changes data={data} />

      <hr />

      <div className="modify-div">
        <button
          onClick={(e) => {
            setOpenModify({ status: false, on: form.id });
            handleReset(e);
          }}
        >
          {" "}
          Cancelar{" "}
        </button>

        <button type="reset" onClick={(e) => handleReset(e)}>
          Restablecer
        </button>
      </div>

      <hr />

      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Guardar
      </button>
      <hr />
    </form>
  );
}
