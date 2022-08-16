import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAll } from "../../redux/action";

import Cards from "../Cards/Card";
import Create from "../Forms/CreateTodo";

import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();

  const [openCreate, setOpenCreate] = useState(false);

  var incomplete = [];
  var inprogress = [];
  var complete = [];

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  const { all } = useSelector((state) => state);

  // console.log(all);

  if (all?.length > 0) {
    incomplete = all?.filter((all) => all.status === "incomplete");
    inprogress = all?.filter((all) => all.status === "inprogress");
    complete = all?.filter((all) => all.status === "complete");
  } else {
    incomplete = [];
    inprogress = [];
    complete = [];
  }

  try {
    return (
      <div>
        {openCreate ? (
          <Create setOpenCreate={setOpenCreate} />
        ) : (
          <>
            <h2> Tareas </h2>
            <button
              className="cards-buttons"
              onClick={() => setOpenCreate(true)}
            >
              Crear tarea
            </button>
            {all.length > 0 ? (
              <div className="cards">
                {incomplete.length > 0 ? (
                  <div className="incomplete">
                    <h4> Incompletas </h4>
                    <Cards data={incomplete} />
                  </div>
                ) : (
                  <div className="incomplete">
                    <h4> Incompletas </h4>
                    <label> No hay tareas incompletas </label>
                  </div>
                )}

                {inprogress.length > 0 ? (
                  <div className="inprogress">
                    <h4> En progreso </h4>
                    <Cards data={inprogress} />
                  </div>
                ) : (
                  <div className="incomplete">
                    <h4> En progreso </h4>
                    <label> No hay tareas en progreso </label>
                  </div>
                )}

                {complete.length > 0 ? (
                  <div className="complete">
                    <h4> Completas </h4> <Cards data={complete} />
                  </div>
                ) : (
                  <div className="incomplete">
                    <h4> Completas </h4>
                    <label> No hay tareas completas </label>
                  </div>
                )}
              </div>
            ) : (
              <h4>No hay tareas</h4>
            )}
          </>
        )}
      </div>
    );
  } catch (error) {}
}
