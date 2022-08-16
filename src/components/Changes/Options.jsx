import React, { useState } from "react";
import { useDispatch } from "react-redux";

import swal from "sweetalert";

import { modify, deleteTodo } from "../../redux/action";

export default function Changes(data) {
  const dispatch = useDispatch();

  // console.log(data.data);

  const [isChecked, setIsChecked] = useState(false);

  const form = {
    id: data.data._id,
    title: data.data.title,
    description: data.data.description,
  };

  const handleSelect = (e) => {
    e.preventDefault();
    setIsChecked(!isChecked);

    if (
      e.target.value === "incomplete" ||
      e.target.value === "inprogress" ||
      e.target.value === "complete"
    ) {
      form.status = e.target.value;
      dispatch(modify(form));
      swal({
        title: "Estado cambiado",
        icon: "success",
        button: "Aceptar",
        timer: "3000",
      }).then(() => {
        window.location.reload();
      });
    } else if (e.target.value === "delete") {
      dispatch(deleteTodo(data.data._id));
      swal({
        title: "Tarea eliminada",
        icon: "success",
        button: "Aceptar",
        timer: "3000",
      }).then(() => {
        window.location.reload();
      });
    }
    // recarga la pagina de manera automatica despues de ejecutar lo de arriba
    // cada vez que haya cambios no quedara todo vacio
    // window.location.reload();
  };
  try {
    return (
      <div>
        {data.data.status === "complete" ? (
          <label>
            <button
              id="incomplete"
              name="incomplete"
              value="incomplete"
              onClick={(e) => handleSelect(e)}
            >
              Cambiar estado a incompleto
            </button>
            <br />
            <br />
            <button
              id="inprogress"
              name="inprogress"
              value="inprogress"
              onClick={(e) => handleSelect(e)}
            >
              Cambiar estado a en progreso
            </button>
            <br />
            <br />
            <button
              id="delete"
              name="delete"
              value="delete"
              onClick={(e) => handleSelect(e)}
            >
              Borrar tarea
            </button>
          </label>
        ) : data.data.status === "inprogress" ? (
          <label>
            <button
              id="incomplete"
              name="incomplete"
              value="incomplete"
              onClick={(e) => handleSelect(e)}
            >
              Cambiar estado a incompleto
            </button>
            <br />
            <br />
            <button
              id="complete"
              name="complete"
              value="complete"
              onClick={(e) => handleSelect(e)}
            >
              Cambiar estado a completo
            </button>
            <br />
            <br />
            <button
              id="delete"
              name="delete"
              value="delete"
              onClick={(e) => handleSelect(e)}
            >
              Borrar tarea
            </button>
          </label>
        ) : (
          <label>
            <button
              id="inprogress"
              name="inprogress"
              value="inprogress"
              onClick={(e) => handleSelect(e)}
            >
              Cambiar estado a en progreso
            </button>
            <br />
            <br />
            <button
              id="complete"
              name="complete"
              value="complete"
              onClick={(e) => handleSelect(e)}
            >
              Cambiar estado a completo
            </button>
            <br />
            <br />
            <button
              id="delete"
              name="delete"
              value="delete"
              onClick={(e) => handleSelect(e)}
            >
              Borrar tarea
            </button>
          </label>
        )}
      </div>
    );
  } catch (error) {}
}
